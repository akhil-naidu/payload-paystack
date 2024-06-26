import type { Config, Plugin } from 'payload/config'
import { CollectionAfterOperationHook } from 'payload/types'

const createPaystackCustomer: CollectionAfterOperationHook = async ({ req, operation, result }) => {
  const { payload } = req

  if (operation === 'create') {
    console.log('this is from my custom plugin', result)
  }

  return result
}

export const createCustomer: Plugin = (incomingConfig: Config): Config => {
  // find the user collection
  // once you find the user collection add a new hook to it
  // example would be create a console.log() of the existing data
  // once it is clear, ensure you trigger paystack api to create new customer

  console.log(incomingConfig)

  // @ts-ignore
  const updatedCollection = incomingConfig.collections.map(collection => {
    if (collection.slug === 'users') {
      return {
        ...collection,
        hooks: {
          afterOperation: [createPaystackCustomer],
        },
      }
    }

    return collection
  })
  const config = {
    ...incomingConfig,
    collections: updatedCollection,
  }

  return config
}
