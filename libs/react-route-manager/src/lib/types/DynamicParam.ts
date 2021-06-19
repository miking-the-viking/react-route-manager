
/**
 * A dynamic route has defined slugs which have matching keys in the params object.
 * 
 * For each key, "key" in the params object for a route, a corresponding ":key" must be present in the `path` string
 */
export type DynamicParam<S extends string> = `:${S}`


 /**
  * A route can support additional strings, divided by '/' around the dynamic parameter slug.
  */
export type DynamicParamRoute<T extends string> = (
    T extends any
    ? ( x: `${string}/${DynamicParam<T>}/${string}` | `${DynamicParam<T>}/${string}` | `${string}/${DynamicParam<T>}` | `${DynamicParam<T>}`) => void
    : never
) extends ((x: infer I) => void)
    ? I
    : never;
  
 