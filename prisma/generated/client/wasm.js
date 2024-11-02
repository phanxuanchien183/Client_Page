
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.18.0
 * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
 */
Prisma.prismaVersion = {
  client: "5.18.0",
  engine: "4c784e32044a8a016d99474bd02a3b6123742169"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  user_name: 'user_name',
  password: 'password',
  salt: 'salt',
  refresh_token: 'refresh_token',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  dob: 'dob',
  address: 'address',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ProductStatusScalarFieldEnum = {
  id: 'id',
  name: 'name',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  parent_id: 'parent_id',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SliderScalarFieldEnum = {
  id: 'id',
  title: 'title',
  uri: 'uri',
  image: 'image',
  category_id: 'category_id',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.DetailScalarFieldEnum = {
  id: 'id',
  info: 'info',
  specification: 'specification',
  options_type: 'options_type',
  category_id: 'category_id',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.BannerScalarFieldEnum = {
  id: 'id',
  title: 'title',
  uri: 'uri',
  image: 'image',
  type: 'type',
  category_id: 'category_id',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  unit_weight: 'unit_weight',
  unit_price: 'unit_price',
  currency: 'currency',
  description_tiny: 'description_tiny',
  description_full: 'description_full',
  category_id: 'category_id',
  status_id: 'status_id',
  price_sale_off: 'price_sale_off',
  sale_off_from: 'sale_off_from',
  sale_off_to: 'sale_off_to',
  quantity: 'quantity',
  featured: 'featured',
  is_new: 'is_new',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.OrderDetailScalarFieldEnum = {
  order_id: 'order_id',
  product_id: 'product_id',
  quantity: 'quantity',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  account_id: 'account_id',
  shipping_id: 'shipping_id',
  payment_id: 'payment_id',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RatingScalarFieldEnum = {
  id: 'id',
  name: 'name',
  point: 'point',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PaymentDetailScalarFieldEnum = {
  payment_id: 'payment_id',
  account_id: 'account_id',
  card_holder: 'card_holder',
  card_number: 'card_number',
  card_expire: 'card_expire',
  address: 'address',
  email: 'email',
  phone: 'phone',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ShippingScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  price: 'price',
  currency: 'currency',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ShippingAddressScalarFieldEnum = {
  id: 'id',
  account_id: 'account_id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  address: 'address',
  zip_code: 'zip_code',
  province: 'province',
  city: 'city',
  area: 'area',
  country: 'country',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ReviewScalarFieldEnum = {
  account_id: 'account_id',
  product_id: 'product_id',
  vote_id: 'vote_id',
  comment: 'comment',
  published: 'published',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Type = exports.$Enums.Type = {
  COLORS: 'COLORS',
  SIZES: 'SIZES',
  NONE: 'NONE'
};

exports.Prisma.ModelName = {
  Account: 'Account',
  User: 'User',
  Role: 'Role',
  ProductStatus: 'ProductStatus',
  Category: 'Category',
  Slider: 'Slider',
  Detail: 'Detail',
  Banner: 'Banner',
  Product: 'Product',
  OrderDetail: 'OrderDetail',
  Order: 'Order',
  Rating: 'Rating',
  Payment: 'Payment',
  PaymentDetail: 'PaymentDetail',
  Shipping: 'Shipping',
  ShippingAddress: 'ShippingAddress',
  Review: 'Review'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
