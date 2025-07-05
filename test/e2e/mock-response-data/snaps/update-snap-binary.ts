import fs from 'fs';
import path from 'path';
import { valid as semverValid } from 'semver';
import { getLocalSnapLatestVersion } from './snap-binary-mocks';

const RESET = '\x1b[0m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m', CYAN = '\x1b[36m', RED = '\x1b[31m';
const SNAP_DIR = path.join(__dirname, 'snap-binaries-and-headers');

type Arguments = { snapIdentifier?: string; help?: boolean };

const getArgs = (): Arguments => {
  const result: Arguments = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--')) {
      const rawArg = arg.slice(2);
      if (rawArg === 'help') result.help = true;
      else if (rawArg.includes('@')) result.snapIdentifier = rawArg;
      else console.warn(`${YELLOW}Warning: Unrecognized argument format: ${arg}${RESET}`);
    }
  }
  return result;
};

const fetchSnapData = async (
  snapName: string,
  version: string,
): Promise<{ headers: Record<string, string>; body: Buffer } | undefined> => {
  try {
    const response = await fetch(`https://registry.npmjs.org/@gersiapp/${snapName}/-/${snapName}-${version}.tgz`);
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`${RED}Snap not found in the registry: ${snapName}@${version}${RESET}`);
        process.exit(1);
      }
      throw new Error(`Failed to fetch snap: ${response.statusText}`);
    }
    return { headers: Object.fromEntries(response.headers.entries()), body: Buffer.from(await response.arrayBuffer()) };
  } catch (error) {
    console.error(`${RED}Error fetching snap data:${RESET}`, error);
    process.exit(1);
  }
};

const saveSnapFiles =
  (snapName:string, version:string, data:{ headers:any; body:any }) => {
    const txtFilePath=path.join(SNAP_DIR, `${snapName}@${version}.txt`);
    const headersFilePath=path.join(SNAP_DIR, `${snapName}@${version}-headers.json`);

    fs.writeFileSync(txtFilePath,data.body);

    fs.writeFileSync(headersFilePath,
      JSON.stringify({
        "Accept-Ranges":"bytes",
        "Content-Length":data.headers['content-length'],
        "Content-Type":"application/octet-stream",
        Etag:data.headers.etag,
        Vary:"Accept-Encoding"
      }, null,2)+"\n");

    console.log(`${GREEN}Successfully saved:${RESET} ${txtFilePath}\n${GREEN}Successfully saved:${RESET} ${headersFilePath}`);
};

const deleteOldSnapFiles=(snapName:string,currentVersionBeingSaved:string)=>{
  let versionToDelete:string|null=null;

  try{
     const latestExistingVersion=getLocalSnapLatestVersion(snapName);
     if(latestExistingVersion!==currentVersionBeingSaved) versionToDelete=latestExistingVersion;
   }catch(e:any){
     console.log(`${YELLOW}Info: No existing versions of ${snapName} found or error:${e instanceof Error? e.message : e}${RESET}`);
   }

   if(versionToDelete){
     console.log(`${CYAN}Identified version to delete for ${snapName}: ${versionToDelete}${RESET}`);

     [path.join(SNAP_DIR,`${snapName}@${versionToDelete}.txt`),
       path.join(SNAP_DIR,`${snapName}@${versionToDelete}-headers.json`)
     ].forEach(f=>{
       if(fs.existsSync(f)){
         try{fs.unlinkSync(f);console.log(`${GREEN}Successfully deleted old file:${RESET} ${f}`);}catch(e){console.error(`${RED}Error deleting file ${f}:${RESET}`,e);}
       }
     });
   }
};

const printHelp=()=>console.log(
`${YELLOW}Usage:${RESET} yarn update-snap-binary ${CYAN}--<snapName>@<version>${RESET}
${YELLOW}Example:${RESET} yarn update-snap-binary ${CYAN}--bip32-example-snap@2.3.0${RESET}
Please ensure the version is a valid semantic version (e.g., 1.2.3).`
);

(async () => {
  const args=getArgs();

  if(args.help){printHelp();process.exit(0);}
  
  if(!args.snapIdentifier){
   console.error(`${RED}Error: Snap identifier not provided. Use --help for usage.${RESET}`);process.exit(1);
 }

 const parts=args.snapIdentifier.split('@');
 
if(parts.length!==2||!parts[0]||!parts[1]){
   console.error(
`${RED}
Error:
Invalid format for snap identifier "${args.snapIdentifier}".
Expected format <name>@<version>, e.g., bip32-example-snap@2.3.0.
Use --help for usage.
${RESET}`
 );process.exit(1);}

if(!semverValid(parts[1])){
   console.error(
`${RED}
Error:
Invalid semantic version "${parts[1]}" in "${args.snapIdentifier}".
Use --help for usage.
${RESET}`
 );process.exit(1);}

console.log(`Fetching snap: ${CYAN}${parts[0]}${RESET}, version: ${CYAN}${parts[1]}${RESET}`);

const snapData=await fetchSnapData(parts[0], parts[1]);

if(snapData){
 deleteOldSnapFiles(parts[0], parts[1]);
 saveSnapFiles(parts[0], parts[1], snapData);
 console.log(`${GREEN}Snap update process completed.${RESET}`);}
})().catch(error=>{console.error(`${RED}}Unhandled error in main function:${RESET}`,error);process.exit(1)});
