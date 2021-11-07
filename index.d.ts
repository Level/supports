export function supports (...manifests: Array<Partial<IManifest>>): IManifest

export interface IManifest {
  bufferKeys: boolean
  snapshots: boolean
  permanence: boolean
  seek: boolean
  clear: boolean
  getMany: boolean
  keyIterator: boolean
  valueIterator: boolean
  iteratorNextv: boolean
  iteratorAll: boolean
  status: boolean
  idempotentOpen: boolean
  passiveOpen: boolean
  serialize: boolean
  createIfMissing: boolean
  errorIfExists: boolean
  deferredOpen: boolean
  openCallback: boolean
  promises: boolean
  streams: boolean
  encodings: Record<string, boolean>
  events: Record<string, boolean>
  additionalMethods: Record<string, boolean>
}
