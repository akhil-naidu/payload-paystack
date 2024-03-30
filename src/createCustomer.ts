import type { Config, Plugin } from 'payload/config'
import { CollectionAfterOperationHook } from 'payload/types'

const createPaystackCustomer: CollectionAfterOperationHook = async ({ req, result }) => {
  const { payload } = req

  console.log('this is from my custom plugin', payload, result)

  return result
}

export const createCustomer: Plugin = (incomingConfig: Config): Config => {
  // find the user collection
  // once you find the user collection add a new hook to it
  // example would be create a console.log() of the existing data
  // once it is clear, ensure you trigger paystack api to create new customer
  const config = {
    ...incomingConfig,
    // @ts-ignore
    collections: incomingConfig.collections.map(collection => {
      if (collection.slug === 'users') {
        return {
          ...collection,
          hooks: {
            ...collection.hooks,
            afterOperationHook: [
              // @ts-ignore
              ...collection.hooks.afterOperationHook,
              createPaystackCustomer,
            ],
          },
        }
      }

      return collection
    }),
  }

  return config
}
