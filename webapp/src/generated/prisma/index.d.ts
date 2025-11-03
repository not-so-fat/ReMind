
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Target
 * 
 */
export type Target = $Result.DefaultSelection<Prisma.$TargetPayload>
/**
 * Model Quiz
 * 
 */
export type Quiz = $Result.DefaultSelection<Prisma.$QuizPayload>
/**
 * Model Trial
 * 
 */
export type Trial = $Result.DefaultSelection<Prisma.$TrialPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Targets
 * const targets = await prisma.target.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Targets
   * const targets = await prisma.target.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.target`: Exposes CRUD operations for the **Target** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Targets
    * const targets = await prisma.target.findMany()
    * ```
    */
  get target(): Prisma.TargetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quiz`: Exposes CRUD operations for the **Quiz** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quizzes
    * const quizzes = await prisma.quiz.findMany()
    * ```
    */
  get quiz(): Prisma.QuizDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trial`: Exposes CRUD operations for the **Trial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trials
    * const trials = await prisma.trial.findMany()
    * ```
    */
  get trial(): Prisma.TrialDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Target: 'Target',
    Quiz: 'Quiz',
    Trial: 'Trial'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "target" | "quiz" | "trial"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Target: {
        payload: Prisma.$TargetPayload<ExtArgs>
        fields: Prisma.TargetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TargetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TargetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          findFirst: {
            args: Prisma.TargetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TargetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          findMany: {
            args: Prisma.TargetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          create: {
            args: Prisma.TargetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          createMany: {
            args: Prisma.TargetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TargetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          delete: {
            args: Prisma.TargetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          update: {
            args: Prisma.TargetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          deleteMany: {
            args: Prisma.TargetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TargetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TargetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          upsert: {
            args: Prisma.TargetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          aggregate: {
            args: Prisma.TargetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTarget>
          }
          groupBy: {
            args: Prisma.TargetGroupByArgs<ExtArgs>
            result: $Utils.Optional<TargetGroupByOutputType>[]
          }
          count: {
            args: Prisma.TargetCountArgs<ExtArgs>
            result: $Utils.Optional<TargetCountAggregateOutputType> | number
          }
        }
      }
      Quiz: {
        payload: Prisma.$QuizPayload<ExtArgs>
        fields: Prisma.QuizFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          findFirst: {
            args: Prisma.QuizFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          findMany: {
            args: Prisma.QuizFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          create: {
            args: Prisma.QuizCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          createMany: {
            args: Prisma.QuizCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          delete: {
            args: Prisma.QuizDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          update: {
            args: Prisma.QuizUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          deleteMany: {
            args: Prisma.QuizDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          upsert: {
            args: Prisma.QuizUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          aggregate: {
            args: Prisma.QuizAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuiz>
          }
          groupBy: {
            args: Prisma.QuizGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizCountArgs<ExtArgs>
            result: $Utils.Optional<QuizCountAggregateOutputType> | number
          }
        }
      }
      Trial: {
        payload: Prisma.$TrialPayload<ExtArgs>
        fields: Prisma.TrialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>
          }
          findFirst: {
            args: Prisma.TrialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>
          }
          findMany: {
            args: Prisma.TrialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>[]
          }
          create: {
            args: Prisma.TrialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>
          }
          createMany: {
            args: Prisma.TrialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>[]
          }
          delete: {
            args: Prisma.TrialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>
          }
          update: {
            args: Prisma.TrialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>
          }
          deleteMany: {
            args: Prisma.TrialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>[]
          }
          upsert: {
            args: Prisma.TrialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrialPayload>
          }
          aggregate: {
            args: Prisma.TrialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrial>
          }
          groupBy: {
            args: Prisma.TrialGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrialGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrialCountArgs<ExtArgs>
            result: $Utils.Optional<TrialCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    target?: TargetOmit
    quiz?: QuizOmit
    trial?: TrialOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TargetCountOutputType
   */

  export type TargetCountOutputType = {
    quizzes: number
  }

  export type TargetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizzes?: boolean | TargetCountOutputTypeCountQuizzesArgs
  }

  // Custom InputTypes
  /**
   * TargetCountOutputType without action
   */
  export type TargetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetCountOutputType
     */
    select?: TargetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TargetCountOutputType without action
   */
  export type TargetCountOutputTypeCountQuizzesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizWhereInput
  }


  /**
   * Count Type QuizCountOutputType
   */

  export type QuizCountOutputType = {
    trials: number
  }

  export type QuizCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trials?: boolean | QuizCountOutputTypeCountTrialsArgs
  }

  // Custom InputTypes
  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizCountOutputType
     */
    select?: QuizCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeCountTrialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrialWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Target
   */

  export type AggregateTarget = {
    _count: TargetCountAggregateOutputType | null
    _min: TargetMinAggregateOutputType | null
    _max: TargetMaxAggregateOutputType | null
  }

  export type TargetMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type TargetMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type TargetCountAggregateOutputType = {
    id: number
    name: number
    configJson: number
    createdAt: number
    _all: number
  }


  export type TargetMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type TargetMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type TargetCountAggregateInputType = {
    id?: true
    name?: true
    configJson?: true
    createdAt?: true
    _all?: true
  }

  export type TargetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Target to aggregate.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Targets
    **/
    _count?: true | TargetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TargetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TargetMaxAggregateInputType
  }

  export type GetTargetAggregateType<T extends TargetAggregateArgs> = {
        [P in keyof T & keyof AggregateTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTarget[P]>
      : GetScalarType<T[P], AggregateTarget[P]>
  }




  export type TargetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TargetWhereInput
    orderBy?: TargetOrderByWithAggregationInput | TargetOrderByWithAggregationInput[]
    by: TargetScalarFieldEnum[] | TargetScalarFieldEnum
    having?: TargetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TargetCountAggregateInputType | true
    _min?: TargetMinAggregateInputType
    _max?: TargetMaxAggregateInputType
  }

  export type TargetGroupByOutputType = {
    id: string
    name: string
    configJson: JsonValue | null
    createdAt: Date
    _count: TargetCountAggregateOutputType | null
    _min: TargetMinAggregateOutputType | null
    _max: TargetMaxAggregateOutputType | null
  }

  type GetTargetGroupByPayload<T extends TargetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TargetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TargetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TargetGroupByOutputType[P]>
            : GetScalarType<T[P], TargetGroupByOutputType[P]>
        }
      >
    >


  export type TargetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    configJson?: boolean
    createdAt?: boolean
    quizzes?: boolean | Target$quizzesArgs<ExtArgs>
    _count?: boolean | TargetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["target"]>

  export type TargetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    configJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["target"]>

  export type TargetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    configJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["target"]>

  export type TargetSelectScalar = {
    id?: boolean
    name?: boolean
    configJson?: boolean
    createdAt?: boolean
  }

  export type TargetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "configJson" | "createdAt", ExtArgs["result"]["target"]>
  export type TargetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizzes?: boolean | Target$quizzesArgs<ExtArgs>
    _count?: boolean | TargetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TargetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TargetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TargetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Target"
    objects: {
      quizzes: Prisma.$QuizPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      configJson: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["target"]>
    composites: {}
  }

  type TargetGetPayload<S extends boolean | null | undefined | TargetDefaultArgs> = $Result.GetResult<Prisma.$TargetPayload, S>

  type TargetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TargetCountAggregateInputType | true
    }

  export interface TargetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Target'], meta: { name: 'Target' } }
    /**
     * Find zero or one Target that matches the filter.
     * @param {TargetFindUniqueArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TargetFindUniqueArgs>(args: SelectSubset<T, TargetFindUniqueArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Target that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TargetFindUniqueOrThrowArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TargetFindUniqueOrThrowArgs>(args: SelectSubset<T, TargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Target that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindFirstArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TargetFindFirstArgs>(args?: SelectSubset<T, TargetFindFirstArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Target that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindFirstOrThrowArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TargetFindFirstOrThrowArgs>(args?: SelectSubset<T, TargetFindFirstOrThrowArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Targets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Targets
     * const targets = await prisma.target.findMany()
     * 
     * // Get first 10 Targets
     * const targets = await prisma.target.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const targetWithIdOnly = await prisma.target.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TargetFindManyArgs>(args?: SelectSubset<T, TargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Target.
     * @param {TargetCreateArgs} args - Arguments to create a Target.
     * @example
     * // Create one Target
     * const Target = await prisma.target.create({
     *   data: {
     *     // ... data to create a Target
     *   }
     * })
     * 
     */
    create<T extends TargetCreateArgs>(args: SelectSubset<T, TargetCreateArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Targets.
     * @param {TargetCreateManyArgs} args - Arguments to create many Targets.
     * @example
     * // Create many Targets
     * const target = await prisma.target.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TargetCreateManyArgs>(args?: SelectSubset<T, TargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Targets and returns the data saved in the database.
     * @param {TargetCreateManyAndReturnArgs} args - Arguments to create many Targets.
     * @example
     * // Create many Targets
     * const target = await prisma.target.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Targets and only return the `id`
     * const targetWithIdOnly = await prisma.target.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TargetCreateManyAndReturnArgs>(args?: SelectSubset<T, TargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Target.
     * @param {TargetDeleteArgs} args - Arguments to delete one Target.
     * @example
     * // Delete one Target
     * const Target = await prisma.target.delete({
     *   where: {
     *     // ... filter to delete one Target
     *   }
     * })
     * 
     */
    delete<T extends TargetDeleteArgs>(args: SelectSubset<T, TargetDeleteArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Target.
     * @param {TargetUpdateArgs} args - Arguments to update one Target.
     * @example
     * // Update one Target
     * const target = await prisma.target.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TargetUpdateArgs>(args: SelectSubset<T, TargetUpdateArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Targets.
     * @param {TargetDeleteManyArgs} args - Arguments to filter Targets to delete.
     * @example
     * // Delete a few Targets
     * const { count } = await prisma.target.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TargetDeleteManyArgs>(args?: SelectSubset<T, TargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Targets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Targets
     * const target = await prisma.target.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TargetUpdateManyArgs>(args: SelectSubset<T, TargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Targets and returns the data updated in the database.
     * @param {TargetUpdateManyAndReturnArgs} args - Arguments to update many Targets.
     * @example
     * // Update many Targets
     * const target = await prisma.target.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Targets and only return the `id`
     * const targetWithIdOnly = await prisma.target.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TargetUpdateManyAndReturnArgs>(args: SelectSubset<T, TargetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Target.
     * @param {TargetUpsertArgs} args - Arguments to update or create a Target.
     * @example
     * // Update or create a Target
     * const target = await prisma.target.upsert({
     *   create: {
     *     // ... data to create a Target
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Target we want to update
     *   }
     * })
     */
    upsert<T extends TargetUpsertArgs>(args: SelectSubset<T, TargetUpsertArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Targets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetCountArgs} args - Arguments to filter Targets to count.
     * @example
     * // Count the number of Targets
     * const count = await prisma.target.count({
     *   where: {
     *     // ... the filter for the Targets we want to count
     *   }
     * })
    **/
    count<T extends TargetCountArgs>(
      args?: Subset<T, TargetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TargetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Target.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TargetAggregateArgs>(args: Subset<T, TargetAggregateArgs>): Prisma.PrismaPromise<GetTargetAggregateType<T>>

    /**
     * Group by Target.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TargetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TargetGroupByArgs['orderBy'] }
        : { orderBy?: TargetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Target model
   */
  readonly fields: TargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Target.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TargetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quizzes<T extends Target$quizzesArgs<ExtArgs> = {}>(args?: Subset<T, Target$quizzesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Target model
   */
  interface TargetFieldRefs {
    readonly id: FieldRef<"Target", 'String'>
    readonly name: FieldRef<"Target", 'String'>
    readonly configJson: FieldRef<"Target", 'Json'>
    readonly createdAt: FieldRef<"Target", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Target findUnique
   */
  export type TargetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target findUniqueOrThrow
   */
  export type TargetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target findFirst
   */
  export type TargetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Targets.
     */
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target findFirstOrThrow
   */
  export type TargetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Targets.
     */
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target findMany
   */
  export type TargetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Targets to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target create
   */
  export type TargetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The data needed to create a Target.
     */
    data: XOR<TargetCreateInput, TargetUncheckedCreateInput>
  }

  /**
   * Target createMany
   */
  export type TargetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Targets.
     */
    data: TargetCreateManyInput | TargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Target createManyAndReturn
   */
  export type TargetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * The data used to create many Targets.
     */
    data: TargetCreateManyInput | TargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Target update
   */
  export type TargetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The data needed to update a Target.
     */
    data: XOR<TargetUpdateInput, TargetUncheckedUpdateInput>
    /**
     * Choose, which Target to update.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target updateMany
   */
  export type TargetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Targets.
     */
    data: XOR<TargetUpdateManyMutationInput, TargetUncheckedUpdateManyInput>
    /**
     * Filter which Targets to update
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to update.
     */
    limit?: number
  }

  /**
   * Target updateManyAndReturn
   */
  export type TargetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * The data used to update Targets.
     */
    data: XOR<TargetUpdateManyMutationInput, TargetUncheckedUpdateManyInput>
    /**
     * Filter which Targets to update
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to update.
     */
    limit?: number
  }

  /**
   * Target upsert
   */
  export type TargetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The filter to search for the Target to update in case it exists.
     */
    where: TargetWhereUniqueInput
    /**
     * In case the Target found by the `where` argument doesn't exist, create a new Target with this data.
     */
    create: XOR<TargetCreateInput, TargetUncheckedCreateInput>
    /**
     * In case the Target was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TargetUpdateInput, TargetUncheckedUpdateInput>
  }

  /**
   * Target delete
   */
  export type TargetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter which Target to delete.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target deleteMany
   */
  export type TargetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Targets to delete
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to delete.
     */
    limit?: number
  }

  /**
   * Target.quizzes
   */
  export type Target$quizzesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    where?: QuizWhereInput
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    cursor?: QuizWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Target without action
   */
  export type TargetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
  }


  /**
   * Model Quiz
   */

  export type AggregateQuiz = {
    _count: QuizCountAggregateOutputType | null
    _avg: QuizAvgAggregateOutputType | null
    _sum: QuizSumAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  export type QuizAvgAggregateOutputType = {
    numTrials: number | null
    numSuccess: number | null
  }

  export type QuizSumAggregateOutputType = {
    numTrials: number | null
    numSuccess: number | null
  }

  export type QuizMinAggregateOutputType = {
    id: string | null
    targetId: string | null
    question: string | null
    answer: string | null
    createdAt: Date | null
    numTrials: number | null
    numSuccess: number | null
  }

  export type QuizMaxAggregateOutputType = {
    id: string | null
    targetId: string | null
    question: string | null
    answer: string | null
    createdAt: Date | null
    numTrials: number | null
    numSuccess: number | null
  }

  export type QuizCountAggregateOutputType = {
    id: number
    targetId: number
    question: number
    answer: number
    createdAt: number
    numTrials: number
    numSuccess: number
    _all: number
  }


  export type QuizAvgAggregateInputType = {
    numTrials?: true
    numSuccess?: true
  }

  export type QuizSumAggregateInputType = {
    numTrials?: true
    numSuccess?: true
  }

  export type QuizMinAggregateInputType = {
    id?: true
    targetId?: true
    question?: true
    answer?: true
    createdAt?: true
    numTrials?: true
    numSuccess?: true
  }

  export type QuizMaxAggregateInputType = {
    id?: true
    targetId?: true
    question?: true
    answer?: true
    createdAt?: true
    numTrials?: true
    numSuccess?: true
  }

  export type QuizCountAggregateInputType = {
    id?: true
    targetId?: true
    question?: true
    answer?: true
    createdAt?: true
    numTrials?: true
    numSuccess?: true
    _all?: true
  }

  export type QuizAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quiz to aggregate.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quizzes
    **/
    _count?: true | QuizCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizMaxAggregateInputType
  }

  export type GetQuizAggregateType<T extends QuizAggregateArgs> = {
        [P in keyof T & keyof AggregateQuiz]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuiz[P]>
      : GetScalarType<T[P], AggregateQuiz[P]>
  }




  export type QuizGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizWhereInput
    orderBy?: QuizOrderByWithAggregationInput | QuizOrderByWithAggregationInput[]
    by: QuizScalarFieldEnum[] | QuizScalarFieldEnum
    having?: QuizScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizCountAggregateInputType | true
    _avg?: QuizAvgAggregateInputType
    _sum?: QuizSumAggregateInputType
    _min?: QuizMinAggregateInputType
    _max?: QuizMaxAggregateInputType
  }

  export type QuizGroupByOutputType = {
    id: string
    targetId: string
    question: string
    answer: string
    createdAt: Date
    numTrials: number
    numSuccess: number
    _count: QuizCountAggregateOutputType | null
    _avg: QuizAvgAggregateOutputType | null
    _sum: QuizSumAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  type GetQuizGroupByPayload<T extends QuizGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizGroupByOutputType[P]>
            : GetScalarType<T[P], QuizGroupByOutputType[P]>
        }
      >
    >


  export type QuizSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    targetId?: boolean
    question?: boolean
    answer?: boolean
    createdAt?: boolean
    numTrials?: boolean
    numSuccess?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
    trials?: boolean | Quiz$trialsArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    targetId?: boolean
    question?: boolean
    answer?: boolean
    createdAt?: boolean
    numTrials?: boolean
    numSuccess?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    targetId?: boolean
    question?: boolean
    answer?: boolean
    createdAt?: boolean
    numTrials?: boolean
    numSuccess?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectScalar = {
    id?: boolean
    targetId?: boolean
    question?: boolean
    answer?: boolean
    createdAt?: boolean
    numTrials?: boolean
    numSuccess?: boolean
  }

  export type QuizOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "targetId" | "question" | "answer" | "createdAt" | "numTrials" | "numSuccess", ExtArgs["result"]["quiz"]>
  export type QuizInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
    trials?: boolean | Quiz$trialsArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuizIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }
  export type QuizIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }

  export type $QuizPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quiz"
    objects: {
      target: Prisma.$TargetPayload<ExtArgs>
      trials: Prisma.$TrialPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      targetId: string
      question: string
      answer: string
      createdAt: Date
      numTrials: number
      numSuccess: number
    }, ExtArgs["result"]["quiz"]>
    composites: {}
  }

  type QuizGetPayload<S extends boolean | null | undefined | QuizDefaultArgs> = $Result.GetResult<Prisma.$QuizPayload, S>

  type QuizCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizCountAggregateInputType | true
    }

  export interface QuizDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quiz'], meta: { name: 'Quiz' } }
    /**
     * Find zero or one Quiz that matches the filter.
     * @param {QuizFindUniqueArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizFindUniqueArgs>(args: SelectSubset<T, QuizFindUniqueArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quiz that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizFindUniqueOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindFirstArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizFindFirstArgs>(args?: SelectSubset<T, QuizFindFirstArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindFirstOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quizzes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quizzes
     * const quizzes = await prisma.quiz.findMany()
     * 
     * // Get first 10 Quizzes
     * const quizzes = await prisma.quiz.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizWithIdOnly = await prisma.quiz.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizFindManyArgs>(args?: SelectSubset<T, QuizFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quiz.
     * @param {QuizCreateArgs} args - Arguments to create a Quiz.
     * @example
     * // Create one Quiz
     * const Quiz = await prisma.quiz.create({
     *   data: {
     *     // ... data to create a Quiz
     *   }
     * })
     * 
     */
    create<T extends QuizCreateArgs>(args: SelectSubset<T, QuizCreateArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quizzes.
     * @param {QuizCreateManyArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizCreateManyArgs>(args?: SelectSubset<T, QuizCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quizzes and returns the data saved in the database.
     * @param {QuizCreateManyAndReturnArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quizzes and only return the `id`
     * const quizWithIdOnly = await prisma.quiz.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quiz.
     * @param {QuizDeleteArgs} args - Arguments to delete one Quiz.
     * @example
     * // Delete one Quiz
     * const Quiz = await prisma.quiz.delete({
     *   where: {
     *     // ... filter to delete one Quiz
     *   }
     * })
     * 
     */
    delete<T extends QuizDeleteArgs>(args: SelectSubset<T, QuizDeleteArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quiz.
     * @param {QuizUpdateArgs} args - Arguments to update one Quiz.
     * @example
     * // Update one Quiz
     * const quiz = await prisma.quiz.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizUpdateArgs>(args: SelectSubset<T, QuizUpdateArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quizzes.
     * @param {QuizDeleteManyArgs} args - Arguments to filter Quizzes to delete.
     * @example
     * // Delete a few Quizzes
     * const { count } = await prisma.quiz.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizDeleteManyArgs>(args?: SelectSubset<T, QuizDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizUpdateManyArgs>(args: SelectSubset<T, QuizUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes and returns the data updated in the database.
     * @param {QuizUpdateManyAndReturnArgs} args - Arguments to update many Quizzes.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quizzes and only return the `id`
     * const quizWithIdOnly = await prisma.quiz.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quiz.
     * @param {QuizUpsertArgs} args - Arguments to update or create a Quiz.
     * @example
     * // Update or create a Quiz
     * const quiz = await prisma.quiz.upsert({
     *   create: {
     *     // ... data to create a Quiz
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quiz we want to update
     *   }
     * })
     */
    upsert<T extends QuizUpsertArgs>(args: SelectSubset<T, QuizUpsertArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizCountArgs} args - Arguments to filter Quizzes to count.
     * @example
     * // Count the number of Quizzes
     * const count = await prisma.quiz.count({
     *   where: {
     *     // ... the filter for the Quizzes we want to count
     *   }
     * })
    **/
    count<T extends QuizCountArgs>(
      args?: Subset<T, QuizCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizAggregateArgs>(args: Subset<T, QuizAggregateArgs>): Prisma.PrismaPromise<GetQuizAggregateType<T>>

    /**
     * Group by Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizGroupByArgs['orderBy'] }
        : { orderBy?: QuizGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quiz model
   */
  readonly fields: QuizFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quiz.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    target<T extends TargetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TargetDefaultArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trials<T extends Quiz$trialsArgs<ExtArgs> = {}>(args?: Subset<T, Quiz$trialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quiz model
   */
  interface QuizFieldRefs {
    readonly id: FieldRef<"Quiz", 'String'>
    readonly targetId: FieldRef<"Quiz", 'String'>
    readonly question: FieldRef<"Quiz", 'String'>
    readonly answer: FieldRef<"Quiz", 'String'>
    readonly createdAt: FieldRef<"Quiz", 'DateTime'>
    readonly numTrials: FieldRef<"Quiz", 'Int'>
    readonly numSuccess: FieldRef<"Quiz", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Quiz findUnique
   */
  export type QuizFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz findUniqueOrThrow
   */
  export type QuizFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz findFirst
   */
  export type QuizFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz findFirstOrThrow
   */
  export type QuizFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz findMany
   */
  export type QuizFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quizzes to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz create
   */
  export type QuizCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The data needed to create a Quiz.
     */
    data: XOR<QuizCreateInput, QuizUncheckedCreateInput>
  }

  /**
   * Quiz createMany
   */
  export type QuizCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quizzes.
     */
    data: QuizCreateManyInput | QuizCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quiz createManyAndReturn
   */
  export type QuizCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * The data used to create many Quizzes.
     */
    data: QuizCreateManyInput | QuizCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quiz update
   */
  export type QuizUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The data needed to update a Quiz.
     */
    data: XOR<QuizUpdateInput, QuizUncheckedUpdateInput>
    /**
     * Choose, which Quiz to update.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz updateMany
   */
  export type QuizUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quizzes.
     */
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyInput>
    /**
     * Filter which Quizzes to update
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to update.
     */
    limit?: number
  }

  /**
   * Quiz updateManyAndReturn
   */
  export type QuizUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * The data used to update Quizzes.
     */
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyInput>
    /**
     * Filter which Quizzes to update
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quiz upsert
   */
  export type QuizUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The filter to search for the Quiz to update in case it exists.
     */
    where: QuizWhereUniqueInput
    /**
     * In case the Quiz found by the `where` argument doesn't exist, create a new Quiz with this data.
     */
    create: XOR<QuizCreateInput, QuizUncheckedCreateInput>
    /**
     * In case the Quiz was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizUpdateInput, QuizUncheckedUpdateInput>
  }

  /**
   * Quiz delete
   */
  export type QuizDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter which Quiz to delete.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz deleteMany
   */
  export type QuizDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quizzes to delete
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to delete.
     */
    limit?: number
  }

  /**
   * Quiz.trials
   */
  export type Quiz$trialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    where?: TrialWhereInput
    orderBy?: TrialOrderByWithRelationInput | TrialOrderByWithRelationInput[]
    cursor?: TrialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrialScalarFieldEnum | TrialScalarFieldEnum[]
  }

  /**
   * Quiz without action
   */
  export type QuizDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
  }


  /**
   * Model Trial
   */

  export type AggregateTrial = {
    _count: TrialCountAggregateOutputType | null
    _min: TrialMinAggregateOutputType | null
    _max: TrialMaxAggregateOutputType | null
  }

  export type TrialMinAggregateOutputType = {
    id: string | null
    quizId: string | null
    createdAt: Date | null
    success: boolean | null
  }

  export type TrialMaxAggregateOutputType = {
    id: string | null
    quizId: string | null
    createdAt: Date | null
    success: boolean | null
  }

  export type TrialCountAggregateOutputType = {
    id: number
    quizId: number
    createdAt: number
    success: number
    _all: number
  }


  export type TrialMinAggregateInputType = {
    id?: true
    quizId?: true
    createdAt?: true
    success?: true
  }

  export type TrialMaxAggregateInputType = {
    id?: true
    quizId?: true
    createdAt?: true
    success?: true
  }

  export type TrialCountAggregateInputType = {
    id?: true
    quizId?: true
    createdAt?: true
    success?: true
    _all?: true
  }

  export type TrialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trial to aggregate.
     */
    where?: TrialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trials to fetch.
     */
    orderBy?: TrialOrderByWithRelationInput | TrialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trials
    **/
    _count?: true | TrialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrialMaxAggregateInputType
  }

  export type GetTrialAggregateType<T extends TrialAggregateArgs> = {
        [P in keyof T & keyof AggregateTrial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrial[P]>
      : GetScalarType<T[P], AggregateTrial[P]>
  }




  export type TrialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrialWhereInput
    orderBy?: TrialOrderByWithAggregationInput | TrialOrderByWithAggregationInput[]
    by: TrialScalarFieldEnum[] | TrialScalarFieldEnum
    having?: TrialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrialCountAggregateInputType | true
    _min?: TrialMinAggregateInputType
    _max?: TrialMaxAggregateInputType
  }

  export type TrialGroupByOutputType = {
    id: string
    quizId: string
    createdAt: Date
    success: boolean
    _count: TrialCountAggregateOutputType | null
    _min: TrialMinAggregateOutputType | null
    _max: TrialMaxAggregateOutputType | null
  }

  type GetTrialGroupByPayload<T extends TrialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrialGroupByOutputType[P]>
            : GetScalarType<T[P], TrialGroupByOutputType[P]>
        }
      >
    >


  export type TrialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quizId?: boolean
    createdAt?: boolean
    success?: boolean
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trial"]>

  export type TrialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quizId?: boolean
    createdAt?: boolean
    success?: boolean
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trial"]>

  export type TrialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quizId?: boolean
    createdAt?: boolean
    success?: boolean
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trial"]>

  export type TrialSelectScalar = {
    id?: boolean
    quizId?: boolean
    createdAt?: boolean
    success?: boolean
  }

  export type TrialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quizId" | "createdAt" | "success", ExtArgs["result"]["trial"]>
  export type TrialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type TrialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type TrialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }

  export type $TrialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trial"
    objects: {
      quiz: Prisma.$QuizPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quizId: string
      createdAt: Date
      success: boolean
    }, ExtArgs["result"]["trial"]>
    composites: {}
  }

  type TrialGetPayload<S extends boolean | null | undefined | TrialDefaultArgs> = $Result.GetResult<Prisma.$TrialPayload, S>

  type TrialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrialCountAggregateInputType | true
    }

  export interface TrialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trial'], meta: { name: 'Trial' } }
    /**
     * Find zero or one Trial that matches the filter.
     * @param {TrialFindUniqueArgs} args - Arguments to find a Trial
     * @example
     * // Get one Trial
     * const trial = await prisma.trial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrialFindUniqueArgs>(args: SelectSubset<T, TrialFindUniqueArgs<ExtArgs>>): Prisma__TrialClient<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrialFindUniqueOrThrowArgs} args - Arguments to find a Trial
     * @example
     * // Get one Trial
     * const trial = await prisma.trial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrialFindUniqueOrThrowArgs>(args: SelectSubset<T, TrialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrialClient<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrialFindFirstArgs} args - Arguments to find a Trial
     * @example
     * // Get one Trial
     * const trial = await prisma.trial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrialFindFirstArgs>(args?: SelectSubset<T, TrialFindFirstArgs<ExtArgs>>): Prisma__TrialClient<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrialFindFirstOrThrowArgs} args - Arguments to find a Trial
     * @example
     * // Get one Trial
     * const trial = await prisma.trial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrialFindFirstOrThrowArgs>(args?: SelectSubset<T, TrialFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrialClient<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trials
     * const trials = await prisma.trial.findMany()
     * 
     * // Get first 10 Trials
     * const trials = await prisma.trial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trialWithIdOnly = await prisma.trial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrialFindManyArgs>(args?: SelectSubset<T, TrialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trial.
     * @param {TrialCreateArgs} args - Arguments to create a Trial.
     * @example
     * // Create one Trial
     * const Trial = await prisma.trial.create({
     *   data: {
     *     // ... data to create a Trial
     *   }
     * })
     * 
     */
    create<T extends TrialCreateArgs>(args: SelectSubset<T, TrialCreateArgs<ExtArgs>>): Prisma__TrialClient<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trials.
     * @param {TrialCreateManyArgs} args - Arguments to create many Trials.
     * @example
     * // Create many Trials
     * const trial = await prisma.trial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrialCreateManyArgs>(args?: SelectSubset<T, TrialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trials and returns the data saved in the database.
     * @param {TrialCreateManyAndReturnArgs} args - Arguments to create many Trials.
     * @example
     * // Create many Trials
     * const trial = await prisma.trial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trials and only return the `id`
     * const trialWithIdOnly = await prisma.trial.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrialCreateManyAndReturnArgs>(args?: SelectSubset<T, TrialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trial.
     * @param {TrialDeleteArgs} args - Arguments to delete one Trial.
     * @example
     * // Delete one Trial
     * const Trial = await prisma.trial.delete({
     *   where: {
     *     // ... filter to delete one Trial
     *   }
     * })
     * 
     */
    delete<T extends TrialDeleteArgs>(args: SelectSubset<T, TrialDeleteArgs<ExtArgs>>): Prisma__TrialClient<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trial.
     * @param {TrialUpdateArgs} args - Arguments to update one Trial.
     * @example
     * // Update one Trial
     * const trial = await prisma.trial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrialUpdateArgs>(args: SelectSubset<T, TrialUpdateArgs<ExtArgs>>): Prisma__TrialClient<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trials.
     * @param {TrialDeleteManyArgs} args - Arguments to filter Trials to delete.
     * @example
     * // Delete a few Trials
     * const { count } = await prisma.trial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrialDeleteManyArgs>(args?: SelectSubset<T, TrialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trials
     * const trial = await prisma.trial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrialUpdateManyArgs>(args: SelectSubset<T, TrialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trials and returns the data updated in the database.
     * @param {TrialUpdateManyAndReturnArgs} args - Arguments to update many Trials.
     * @example
     * // Update many Trials
     * const trial = await prisma.trial.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trials and only return the `id`
     * const trialWithIdOnly = await prisma.trial.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrialUpdateManyAndReturnArgs>(args: SelectSubset<T, TrialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trial.
     * @param {TrialUpsertArgs} args - Arguments to update or create a Trial.
     * @example
     * // Update or create a Trial
     * const trial = await prisma.trial.upsert({
     *   create: {
     *     // ... data to create a Trial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trial we want to update
     *   }
     * })
     */
    upsert<T extends TrialUpsertArgs>(args: SelectSubset<T, TrialUpsertArgs<ExtArgs>>): Prisma__TrialClient<$Result.GetResult<Prisma.$TrialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrialCountArgs} args - Arguments to filter Trials to count.
     * @example
     * // Count the number of Trials
     * const count = await prisma.trial.count({
     *   where: {
     *     // ... the filter for the Trials we want to count
     *   }
     * })
    **/
    count<T extends TrialCountArgs>(
      args?: Subset<T, TrialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrialAggregateArgs>(args: Subset<T, TrialAggregateArgs>): Prisma.PrismaPromise<GetTrialAggregateType<T>>

    /**
     * Group by Trial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrialGroupByArgs['orderBy'] }
        : { orderBy?: TrialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trial model
   */
  readonly fields: TrialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quiz<T extends QuizDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizDefaultArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trial model
   */
  interface TrialFieldRefs {
    readonly id: FieldRef<"Trial", 'String'>
    readonly quizId: FieldRef<"Trial", 'String'>
    readonly createdAt: FieldRef<"Trial", 'DateTime'>
    readonly success: FieldRef<"Trial", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Trial findUnique
   */
  export type TrialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * Filter, which Trial to fetch.
     */
    where: TrialWhereUniqueInput
  }

  /**
   * Trial findUniqueOrThrow
   */
  export type TrialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * Filter, which Trial to fetch.
     */
    where: TrialWhereUniqueInput
  }

  /**
   * Trial findFirst
   */
  export type TrialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * Filter, which Trial to fetch.
     */
    where?: TrialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trials to fetch.
     */
    orderBy?: TrialOrderByWithRelationInput | TrialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trials.
     */
    cursor?: TrialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trials.
     */
    distinct?: TrialScalarFieldEnum | TrialScalarFieldEnum[]
  }

  /**
   * Trial findFirstOrThrow
   */
  export type TrialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * Filter, which Trial to fetch.
     */
    where?: TrialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trials to fetch.
     */
    orderBy?: TrialOrderByWithRelationInput | TrialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trials.
     */
    cursor?: TrialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trials.
     */
    distinct?: TrialScalarFieldEnum | TrialScalarFieldEnum[]
  }

  /**
   * Trial findMany
   */
  export type TrialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * Filter, which Trials to fetch.
     */
    where?: TrialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trials to fetch.
     */
    orderBy?: TrialOrderByWithRelationInput | TrialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trials.
     */
    cursor?: TrialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trials.
     */
    skip?: number
    distinct?: TrialScalarFieldEnum | TrialScalarFieldEnum[]
  }

  /**
   * Trial create
   */
  export type TrialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * The data needed to create a Trial.
     */
    data: XOR<TrialCreateInput, TrialUncheckedCreateInput>
  }

  /**
   * Trial createMany
   */
  export type TrialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trials.
     */
    data: TrialCreateManyInput | TrialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trial createManyAndReturn
   */
  export type TrialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * The data used to create many Trials.
     */
    data: TrialCreateManyInput | TrialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trial update
   */
  export type TrialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * The data needed to update a Trial.
     */
    data: XOR<TrialUpdateInput, TrialUncheckedUpdateInput>
    /**
     * Choose, which Trial to update.
     */
    where: TrialWhereUniqueInput
  }

  /**
   * Trial updateMany
   */
  export type TrialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trials.
     */
    data: XOR<TrialUpdateManyMutationInput, TrialUncheckedUpdateManyInput>
    /**
     * Filter which Trials to update
     */
    where?: TrialWhereInput
    /**
     * Limit how many Trials to update.
     */
    limit?: number
  }

  /**
   * Trial updateManyAndReturn
   */
  export type TrialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * The data used to update Trials.
     */
    data: XOR<TrialUpdateManyMutationInput, TrialUncheckedUpdateManyInput>
    /**
     * Filter which Trials to update
     */
    where?: TrialWhereInput
    /**
     * Limit how many Trials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trial upsert
   */
  export type TrialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * The filter to search for the Trial to update in case it exists.
     */
    where: TrialWhereUniqueInput
    /**
     * In case the Trial found by the `where` argument doesn't exist, create a new Trial with this data.
     */
    create: XOR<TrialCreateInput, TrialUncheckedCreateInput>
    /**
     * In case the Trial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrialUpdateInput, TrialUncheckedUpdateInput>
  }

  /**
   * Trial delete
   */
  export type TrialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
    /**
     * Filter which Trial to delete.
     */
    where: TrialWhereUniqueInput
  }

  /**
   * Trial deleteMany
   */
  export type TrialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trials to delete
     */
    where?: TrialWhereInput
    /**
     * Limit how many Trials to delete.
     */
    limit?: number
  }

  /**
   * Trial without action
   */
  export type TrialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trial
     */
    select?: TrialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trial
     */
    omit?: TrialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrialInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TargetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    configJson: 'configJson',
    createdAt: 'createdAt'
  };

  export type TargetScalarFieldEnum = (typeof TargetScalarFieldEnum)[keyof typeof TargetScalarFieldEnum]


  export const QuizScalarFieldEnum: {
    id: 'id',
    targetId: 'targetId',
    question: 'question',
    answer: 'answer',
    createdAt: 'createdAt',
    numTrials: 'numTrials',
    numSuccess: 'numSuccess'
  };

  export type QuizScalarFieldEnum = (typeof QuizScalarFieldEnum)[keyof typeof QuizScalarFieldEnum]


  export const TrialScalarFieldEnum: {
    id: 'id',
    quizId: 'quizId',
    createdAt: 'createdAt',
    success: 'success'
  };

  export type TrialScalarFieldEnum = (typeof TrialScalarFieldEnum)[keyof typeof TrialScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TargetWhereInput = {
    AND?: TargetWhereInput | TargetWhereInput[]
    OR?: TargetWhereInput[]
    NOT?: TargetWhereInput | TargetWhereInput[]
    id?: StringFilter<"Target"> | string
    name?: StringFilter<"Target"> | string
    configJson?: JsonNullableFilter<"Target">
    createdAt?: DateTimeFilter<"Target"> | Date | string
    quizzes?: QuizListRelationFilter
  }

  export type TargetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    configJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    quizzes?: QuizOrderByRelationAggregateInput
  }

  export type TargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TargetWhereInput | TargetWhereInput[]
    OR?: TargetWhereInput[]
    NOT?: TargetWhereInput | TargetWhereInput[]
    name?: StringFilter<"Target"> | string
    configJson?: JsonNullableFilter<"Target">
    createdAt?: DateTimeFilter<"Target"> | Date | string
    quizzes?: QuizListRelationFilter
  }, "id">

  export type TargetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    configJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TargetCountOrderByAggregateInput
    _max?: TargetMaxOrderByAggregateInput
    _min?: TargetMinOrderByAggregateInput
  }

  export type TargetScalarWhereWithAggregatesInput = {
    AND?: TargetScalarWhereWithAggregatesInput | TargetScalarWhereWithAggregatesInput[]
    OR?: TargetScalarWhereWithAggregatesInput[]
    NOT?: TargetScalarWhereWithAggregatesInput | TargetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Target"> | string
    name?: StringWithAggregatesFilter<"Target"> | string
    configJson?: JsonNullableWithAggregatesFilter<"Target">
    createdAt?: DateTimeWithAggregatesFilter<"Target"> | Date | string
  }

  export type QuizWhereInput = {
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    id?: StringFilter<"Quiz"> | string
    targetId?: StringFilter<"Quiz"> | string
    question?: StringFilter<"Quiz"> | string
    answer?: StringFilter<"Quiz"> | string
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    numTrials?: IntFilter<"Quiz"> | number
    numSuccess?: IntFilter<"Quiz"> | number
    target?: XOR<TargetScalarRelationFilter, TargetWhereInput>
    trials?: TrialListRelationFilter
  }

  export type QuizOrderByWithRelationInput = {
    id?: SortOrder
    targetId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    numTrials?: SortOrder
    numSuccess?: SortOrder
    target?: TargetOrderByWithRelationInput
    trials?: TrialOrderByRelationAggregateInput
  }

  export type QuizWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    targetId_question_answer?: QuizTargetIdQuestionAnswerCompoundUniqueInput
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    targetId?: StringFilter<"Quiz"> | string
    question?: StringFilter<"Quiz"> | string
    answer?: StringFilter<"Quiz"> | string
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    numTrials?: IntFilter<"Quiz"> | number
    numSuccess?: IntFilter<"Quiz"> | number
    target?: XOR<TargetScalarRelationFilter, TargetWhereInput>
    trials?: TrialListRelationFilter
  }, "id" | "targetId_question_answer">

  export type QuizOrderByWithAggregationInput = {
    id?: SortOrder
    targetId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    numTrials?: SortOrder
    numSuccess?: SortOrder
    _count?: QuizCountOrderByAggregateInput
    _avg?: QuizAvgOrderByAggregateInput
    _max?: QuizMaxOrderByAggregateInput
    _min?: QuizMinOrderByAggregateInput
    _sum?: QuizSumOrderByAggregateInput
  }

  export type QuizScalarWhereWithAggregatesInput = {
    AND?: QuizScalarWhereWithAggregatesInput | QuizScalarWhereWithAggregatesInput[]
    OR?: QuizScalarWhereWithAggregatesInput[]
    NOT?: QuizScalarWhereWithAggregatesInput | QuizScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quiz"> | string
    targetId?: StringWithAggregatesFilter<"Quiz"> | string
    question?: StringWithAggregatesFilter<"Quiz"> | string
    answer?: StringWithAggregatesFilter<"Quiz"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Quiz"> | Date | string
    numTrials?: IntWithAggregatesFilter<"Quiz"> | number
    numSuccess?: IntWithAggregatesFilter<"Quiz"> | number
  }

  export type TrialWhereInput = {
    AND?: TrialWhereInput | TrialWhereInput[]
    OR?: TrialWhereInput[]
    NOT?: TrialWhereInput | TrialWhereInput[]
    id?: StringFilter<"Trial"> | string
    quizId?: StringFilter<"Trial"> | string
    createdAt?: DateTimeFilter<"Trial"> | Date | string
    success?: BoolFilter<"Trial"> | boolean
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
  }

  export type TrialOrderByWithRelationInput = {
    id?: SortOrder
    quizId?: SortOrder
    createdAt?: SortOrder
    success?: SortOrder
    quiz?: QuizOrderByWithRelationInput
  }

  export type TrialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrialWhereInput | TrialWhereInput[]
    OR?: TrialWhereInput[]
    NOT?: TrialWhereInput | TrialWhereInput[]
    quizId?: StringFilter<"Trial"> | string
    createdAt?: DateTimeFilter<"Trial"> | Date | string
    success?: BoolFilter<"Trial"> | boolean
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
  }, "id">

  export type TrialOrderByWithAggregationInput = {
    id?: SortOrder
    quizId?: SortOrder
    createdAt?: SortOrder
    success?: SortOrder
    _count?: TrialCountOrderByAggregateInput
    _max?: TrialMaxOrderByAggregateInput
    _min?: TrialMinOrderByAggregateInput
  }

  export type TrialScalarWhereWithAggregatesInput = {
    AND?: TrialScalarWhereWithAggregatesInput | TrialScalarWhereWithAggregatesInput[]
    OR?: TrialScalarWhereWithAggregatesInput[]
    NOT?: TrialScalarWhereWithAggregatesInput | TrialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trial"> | string
    quizId?: StringWithAggregatesFilter<"Trial"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Trial"> | Date | string
    success?: BoolWithAggregatesFilter<"Trial"> | boolean
  }

  export type TargetCreateInput = {
    id?: string
    name: string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    quizzes?: QuizCreateNestedManyWithoutTargetInput
  }

  export type TargetUncheckedCreateInput = {
    id?: string
    name: string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    quizzes?: QuizUncheckedCreateNestedManyWithoutTargetInput
  }

  export type TargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quizzes?: QuizUpdateManyWithoutTargetNestedInput
  }

  export type TargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quizzes?: QuizUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type TargetCreateManyInput = {
    id?: string
    name: string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizCreateInput = {
    id?: string
    question: string
    answer: string
    createdAt?: Date | string
    numTrials?: number
    numSuccess?: number
    target: TargetCreateNestedOneWithoutQuizzesInput
    trials?: TrialCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateInput = {
    id?: string
    targetId: string
    question: string
    answer: string
    createdAt?: Date | string
    numTrials?: number
    numSuccess?: number
    trials?: TrialUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
    target?: TargetUpdateOneRequiredWithoutQuizzesNestedInput
    trials?: TrialUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
    trials?: TrialUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type QuizCreateManyInput = {
    id?: string
    targetId: string
    question: string
    answer: string
    createdAt?: Date | string
    numTrials?: number
    numSuccess?: number
  }

  export type QuizUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
  }

  export type QuizUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
  }

  export type TrialCreateInput = {
    id?: string
    createdAt?: Date | string
    success: boolean
    quiz: QuizCreateNestedOneWithoutTrialsInput
  }

  export type TrialUncheckedCreateInput = {
    id?: string
    quizId: string
    createdAt?: Date | string
    success: boolean
  }

  export type TrialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    success?: BoolFieldUpdateOperationsInput | boolean
    quiz?: QuizUpdateOneRequiredWithoutTrialsNestedInput
  }

  export type TrialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TrialCreateManyInput = {
    id?: string
    quizId: string
    createdAt?: Date | string
    success: boolean
  }

  export type TrialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TrialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type QuizListRelationFilter = {
    every?: QuizWhereInput
    some?: QuizWhereInput
    none?: QuizWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type QuizOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TargetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    configJson?: SortOrder
    createdAt?: SortOrder
  }

  export type TargetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type TargetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TargetScalarRelationFilter = {
    is?: TargetWhereInput
    isNot?: TargetWhereInput
  }

  export type TrialListRelationFilter = {
    every?: TrialWhereInput
    some?: TrialWhereInput
    none?: TrialWhereInput
  }

  export type TrialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizTargetIdQuestionAnswerCompoundUniqueInput = {
    targetId: string
    question: string
    answer: string
  }

  export type QuizCountOrderByAggregateInput = {
    id?: SortOrder
    targetId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    numTrials?: SortOrder
    numSuccess?: SortOrder
  }

  export type QuizAvgOrderByAggregateInput = {
    numTrials?: SortOrder
    numSuccess?: SortOrder
  }

  export type QuizMaxOrderByAggregateInput = {
    id?: SortOrder
    targetId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    numTrials?: SortOrder
    numSuccess?: SortOrder
  }

  export type QuizMinOrderByAggregateInput = {
    id?: SortOrder
    targetId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    numTrials?: SortOrder
    numSuccess?: SortOrder
  }

  export type QuizSumOrderByAggregateInput = {
    numTrials?: SortOrder
    numSuccess?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type QuizScalarRelationFilter = {
    is?: QuizWhereInput
    isNot?: QuizWhereInput
  }

  export type TrialCountOrderByAggregateInput = {
    id?: SortOrder
    quizId?: SortOrder
    createdAt?: SortOrder
    success?: SortOrder
  }

  export type TrialMaxOrderByAggregateInput = {
    id?: SortOrder
    quizId?: SortOrder
    createdAt?: SortOrder
    success?: SortOrder
  }

  export type TrialMinOrderByAggregateInput = {
    id?: SortOrder
    quizId?: SortOrder
    createdAt?: SortOrder
    success?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type QuizCreateNestedManyWithoutTargetInput = {
    create?: XOR<QuizCreateWithoutTargetInput, QuizUncheckedCreateWithoutTargetInput> | QuizCreateWithoutTargetInput[] | QuizUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: QuizCreateOrConnectWithoutTargetInput | QuizCreateOrConnectWithoutTargetInput[]
    createMany?: QuizCreateManyTargetInputEnvelope
    connect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
  }

  export type QuizUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<QuizCreateWithoutTargetInput, QuizUncheckedCreateWithoutTargetInput> | QuizCreateWithoutTargetInput[] | QuizUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: QuizCreateOrConnectWithoutTargetInput | QuizCreateOrConnectWithoutTargetInput[]
    createMany?: QuizCreateManyTargetInputEnvelope
    connect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type QuizUpdateManyWithoutTargetNestedInput = {
    create?: XOR<QuizCreateWithoutTargetInput, QuizUncheckedCreateWithoutTargetInput> | QuizCreateWithoutTargetInput[] | QuizUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: QuizCreateOrConnectWithoutTargetInput | QuizCreateOrConnectWithoutTargetInput[]
    upsert?: QuizUpsertWithWhereUniqueWithoutTargetInput | QuizUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: QuizCreateManyTargetInputEnvelope
    set?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    disconnect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    delete?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    connect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    update?: QuizUpdateWithWhereUniqueWithoutTargetInput | QuizUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: QuizUpdateManyWithWhereWithoutTargetInput | QuizUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: QuizScalarWhereInput | QuizScalarWhereInput[]
  }

  export type QuizUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<QuizCreateWithoutTargetInput, QuizUncheckedCreateWithoutTargetInput> | QuizCreateWithoutTargetInput[] | QuizUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: QuizCreateOrConnectWithoutTargetInput | QuizCreateOrConnectWithoutTargetInput[]
    upsert?: QuizUpsertWithWhereUniqueWithoutTargetInput | QuizUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: QuizCreateManyTargetInputEnvelope
    set?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    disconnect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    delete?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    connect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    update?: QuizUpdateWithWhereUniqueWithoutTargetInput | QuizUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: QuizUpdateManyWithWhereWithoutTargetInput | QuizUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: QuizScalarWhereInput | QuizScalarWhereInput[]
  }

  export type TargetCreateNestedOneWithoutQuizzesInput = {
    create?: XOR<TargetCreateWithoutQuizzesInput, TargetUncheckedCreateWithoutQuizzesInput>
    connectOrCreate?: TargetCreateOrConnectWithoutQuizzesInput
    connect?: TargetWhereUniqueInput
  }

  export type TrialCreateNestedManyWithoutQuizInput = {
    create?: XOR<TrialCreateWithoutQuizInput, TrialUncheckedCreateWithoutQuizInput> | TrialCreateWithoutQuizInput[] | TrialUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: TrialCreateOrConnectWithoutQuizInput | TrialCreateOrConnectWithoutQuizInput[]
    createMany?: TrialCreateManyQuizInputEnvelope
    connect?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
  }

  export type TrialUncheckedCreateNestedManyWithoutQuizInput = {
    create?: XOR<TrialCreateWithoutQuizInput, TrialUncheckedCreateWithoutQuizInput> | TrialCreateWithoutQuizInput[] | TrialUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: TrialCreateOrConnectWithoutQuizInput | TrialCreateOrConnectWithoutQuizInput[]
    createMany?: TrialCreateManyQuizInputEnvelope
    connect?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TargetUpdateOneRequiredWithoutQuizzesNestedInput = {
    create?: XOR<TargetCreateWithoutQuizzesInput, TargetUncheckedCreateWithoutQuizzesInput>
    connectOrCreate?: TargetCreateOrConnectWithoutQuizzesInput
    upsert?: TargetUpsertWithoutQuizzesInput
    connect?: TargetWhereUniqueInput
    update?: XOR<XOR<TargetUpdateToOneWithWhereWithoutQuizzesInput, TargetUpdateWithoutQuizzesInput>, TargetUncheckedUpdateWithoutQuizzesInput>
  }

  export type TrialUpdateManyWithoutQuizNestedInput = {
    create?: XOR<TrialCreateWithoutQuizInput, TrialUncheckedCreateWithoutQuizInput> | TrialCreateWithoutQuizInput[] | TrialUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: TrialCreateOrConnectWithoutQuizInput | TrialCreateOrConnectWithoutQuizInput[]
    upsert?: TrialUpsertWithWhereUniqueWithoutQuizInput | TrialUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: TrialCreateManyQuizInputEnvelope
    set?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
    disconnect?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
    delete?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
    connect?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
    update?: TrialUpdateWithWhereUniqueWithoutQuizInput | TrialUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: TrialUpdateManyWithWhereWithoutQuizInput | TrialUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: TrialScalarWhereInput | TrialScalarWhereInput[]
  }

  export type TrialUncheckedUpdateManyWithoutQuizNestedInput = {
    create?: XOR<TrialCreateWithoutQuizInput, TrialUncheckedCreateWithoutQuizInput> | TrialCreateWithoutQuizInput[] | TrialUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: TrialCreateOrConnectWithoutQuizInput | TrialCreateOrConnectWithoutQuizInput[]
    upsert?: TrialUpsertWithWhereUniqueWithoutQuizInput | TrialUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: TrialCreateManyQuizInputEnvelope
    set?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
    disconnect?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
    delete?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
    connect?: TrialWhereUniqueInput | TrialWhereUniqueInput[]
    update?: TrialUpdateWithWhereUniqueWithoutQuizInput | TrialUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: TrialUpdateManyWithWhereWithoutQuizInput | TrialUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: TrialScalarWhereInput | TrialScalarWhereInput[]
  }

  export type QuizCreateNestedOneWithoutTrialsInput = {
    create?: XOR<QuizCreateWithoutTrialsInput, QuizUncheckedCreateWithoutTrialsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutTrialsInput
    connect?: QuizWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type QuizUpdateOneRequiredWithoutTrialsNestedInput = {
    create?: XOR<QuizCreateWithoutTrialsInput, QuizUncheckedCreateWithoutTrialsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutTrialsInput
    upsert?: QuizUpsertWithoutTrialsInput
    connect?: QuizWhereUniqueInput
    update?: XOR<XOR<QuizUpdateToOneWithWhereWithoutTrialsInput, QuizUpdateWithoutTrialsInput>, QuizUncheckedUpdateWithoutTrialsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type QuizCreateWithoutTargetInput = {
    id?: string
    question: string
    answer: string
    createdAt?: Date | string
    numTrials?: number
    numSuccess?: number
    trials?: TrialCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateWithoutTargetInput = {
    id?: string
    question: string
    answer: string
    createdAt?: Date | string
    numTrials?: number
    numSuccess?: number
    trials?: TrialUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizCreateOrConnectWithoutTargetInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutTargetInput, QuizUncheckedCreateWithoutTargetInput>
  }

  export type QuizCreateManyTargetInputEnvelope = {
    data: QuizCreateManyTargetInput | QuizCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type QuizUpsertWithWhereUniqueWithoutTargetInput = {
    where: QuizWhereUniqueInput
    update: XOR<QuizUpdateWithoutTargetInput, QuizUncheckedUpdateWithoutTargetInput>
    create: XOR<QuizCreateWithoutTargetInput, QuizUncheckedCreateWithoutTargetInput>
  }

  export type QuizUpdateWithWhereUniqueWithoutTargetInput = {
    where: QuizWhereUniqueInput
    data: XOR<QuizUpdateWithoutTargetInput, QuizUncheckedUpdateWithoutTargetInput>
  }

  export type QuizUpdateManyWithWhereWithoutTargetInput = {
    where: QuizScalarWhereInput
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyWithoutTargetInput>
  }

  export type QuizScalarWhereInput = {
    AND?: QuizScalarWhereInput | QuizScalarWhereInput[]
    OR?: QuizScalarWhereInput[]
    NOT?: QuizScalarWhereInput | QuizScalarWhereInput[]
    id?: StringFilter<"Quiz"> | string
    targetId?: StringFilter<"Quiz"> | string
    question?: StringFilter<"Quiz"> | string
    answer?: StringFilter<"Quiz"> | string
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    numTrials?: IntFilter<"Quiz"> | number
    numSuccess?: IntFilter<"Quiz"> | number
  }

  export type TargetCreateWithoutQuizzesInput = {
    id?: string
    name: string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TargetUncheckedCreateWithoutQuizzesInput = {
    id?: string
    name: string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TargetCreateOrConnectWithoutQuizzesInput = {
    where: TargetWhereUniqueInput
    create: XOR<TargetCreateWithoutQuizzesInput, TargetUncheckedCreateWithoutQuizzesInput>
  }

  export type TrialCreateWithoutQuizInput = {
    id?: string
    createdAt?: Date | string
    success: boolean
  }

  export type TrialUncheckedCreateWithoutQuizInput = {
    id?: string
    createdAt?: Date | string
    success: boolean
  }

  export type TrialCreateOrConnectWithoutQuizInput = {
    where: TrialWhereUniqueInput
    create: XOR<TrialCreateWithoutQuizInput, TrialUncheckedCreateWithoutQuizInput>
  }

  export type TrialCreateManyQuizInputEnvelope = {
    data: TrialCreateManyQuizInput | TrialCreateManyQuizInput[]
    skipDuplicates?: boolean
  }

  export type TargetUpsertWithoutQuizzesInput = {
    update: XOR<TargetUpdateWithoutQuizzesInput, TargetUncheckedUpdateWithoutQuizzesInput>
    create: XOR<TargetCreateWithoutQuizzesInput, TargetUncheckedCreateWithoutQuizzesInput>
    where?: TargetWhereInput
  }

  export type TargetUpdateToOneWithWhereWithoutQuizzesInput = {
    where?: TargetWhereInput
    data: XOR<TargetUpdateWithoutQuizzesInput, TargetUncheckedUpdateWithoutQuizzesInput>
  }

  export type TargetUpdateWithoutQuizzesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TargetUncheckedUpdateWithoutQuizzesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    configJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrialUpsertWithWhereUniqueWithoutQuizInput = {
    where: TrialWhereUniqueInput
    update: XOR<TrialUpdateWithoutQuizInput, TrialUncheckedUpdateWithoutQuizInput>
    create: XOR<TrialCreateWithoutQuizInput, TrialUncheckedCreateWithoutQuizInput>
  }

  export type TrialUpdateWithWhereUniqueWithoutQuizInput = {
    where: TrialWhereUniqueInput
    data: XOR<TrialUpdateWithoutQuizInput, TrialUncheckedUpdateWithoutQuizInput>
  }

  export type TrialUpdateManyWithWhereWithoutQuizInput = {
    where: TrialScalarWhereInput
    data: XOR<TrialUpdateManyMutationInput, TrialUncheckedUpdateManyWithoutQuizInput>
  }

  export type TrialScalarWhereInput = {
    AND?: TrialScalarWhereInput | TrialScalarWhereInput[]
    OR?: TrialScalarWhereInput[]
    NOT?: TrialScalarWhereInput | TrialScalarWhereInput[]
    id?: StringFilter<"Trial"> | string
    quizId?: StringFilter<"Trial"> | string
    createdAt?: DateTimeFilter<"Trial"> | Date | string
    success?: BoolFilter<"Trial"> | boolean
  }

  export type QuizCreateWithoutTrialsInput = {
    id?: string
    question: string
    answer: string
    createdAt?: Date | string
    numTrials?: number
    numSuccess?: number
    target: TargetCreateNestedOneWithoutQuizzesInput
  }

  export type QuizUncheckedCreateWithoutTrialsInput = {
    id?: string
    targetId: string
    question: string
    answer: string
    createdAt?: Date | string
    numTrials?: number
    numSuccess?: number
  }

  export type QuizCreateOrConnectWithoutTrialsInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutTrialsInput, QuizUncheckedCreateWithoutTrialsInput>
  }

  export type QuizUpsertWithoutTrialsInput = {
    update: XOR<QuizUpdateWithoutTrialsInput, QuizUncheckedUpdateWithoutTrialsInput>
    create: XOR<QuizCreateWithoutTrialsInput, QuizUncheckedCreateWithoutTrialsInput>
    where?: QuizWhereInput
  }

  export type QuizUpdateToOneWithWhereWithoutTrialsInput = {
    where?: QuizWhereInput
    data: XOR<QuizUpdateWithoutTrialsInput, QuizUncheckedUpdateWithoutTrialsInput>
  }

  export type QuizUpdateWithoutTrialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
    target?: TargetUpdateOneRequiredWithoutQuizzesNestedInput
  }

  export type QuizUncheckedUpdateWithoutTrialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
  }

  export type QuizCreateManyTargetInput = {
    id?: string
    question: string
    answer: string
    createdAt?: Date | string
    numTrials?: number
    numSuccess?: number
  }

  export type QuizUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
    trials?: TrialUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
    trials?: TrialUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numTrials?: IntFieldUpdateOperationsInput | number
    numSuccess?: IntFieldUpdateOperationsInput | number
  }

  export type TrialCreateManyQuizInput = {
    id?: string
    createdAt?: Date | string
    success: boolean
  }

  export type TrialUpdateWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TrialUncheckedUpdateWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TrialUncheckedUpdateManyWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    success?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}