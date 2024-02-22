import { openDB, type DBSchema } from 'idb'

interface AppDB extends DBSchema {
  'store-v1': {
    key: string
    value: any
  }
}

const dbPromise = openDB<AppDB>('haneokokoro-talk', 1, {
  upgrade (db) {
    db.createObjectStore('store-v1')
  }
})

export async function get (key: string | IDBKeyRange): Promise<any> {
  return await (await dbPromise).get('store-v1', key)
}

export async function set (key: string | IDBKeyRange | undefined, val: any): Promise<string> {
  return await (await dbPromise).put('store-v1', val, key)
}

export async function del (key: string | IDBKeyRange): Promise<void> {
  await (await dbPromise).delete('store-v1', key)
}

export async function clear (): Promise<void> {
  await (await dbPromise).clear('store-v1')
}
