import { isObject } from '@gersiapp/utils';
import { cloneDeep } from 'lodash';

export const version = 87;

export async function migrate({ meta, data }: { meta: { version: number }; data: Record<string, unknown> }) {
  const versionedData = cloneDeep({ meta, data });
  versionedData.meta.version = version;
  versionedData.data = transformState(versionedData.data);
  return versionedData;
}

function transformState(state: Record<string, unknown>) {
  if (!isObject(state.TokensController)) {
    global.sentry?.captureException?.(
      new Error(
        `typeof state.TokensController is ${typeof state.TokensController}`,
      ),
    );
    return state;
  }
  delete state.TokensController?.suggestedAssets;
  return state;
}
