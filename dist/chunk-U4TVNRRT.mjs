import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);
import {
  _any,
  _base64,
  _base64url,
  _bigint,
  _boolean,
  _cidrv4,
  _cidrv6,
  _cuid,
  _cuid2,
  _custom,
  _date,
  _e164,
  _email,
  _emoji,
  _file,
  _float32,
  _float64,
  _guid,
  _int,
  _int32,
  _int64,
  _ipv4,
  _ipv6,
  _jwt,
  _ksuid,
  _nan,
  _nanoid,
  _never,
  _null,
  _number,
  _refine,
  _string,
  _stringFormat,
  _stringbool,
  _symbol,
  _uint32,
  _uint64,
  _ulid,
  _undefined,
  _unknown,
  _url,
  _uuid,
  _uuidv4,
  _uuidv6,
  _uuidv7,
  _void,
  _xid
} from "./chunk-LCS23M2F.mjs";
import {
  $ZodAny,
  $ZodArray,
  $ZodBase64,
  $ZodBase64URL,
  $ZodBigInt,
  $ZodBigIntFormat,
  $ZodBoolean,
  $ZodCIDRv4,
  $ZodCIDRv6,
  $ZodCUID,
  $ZodCUID2,
  $ZodCatch,
  $ZodCustom,
  $ZodCustomStringFormat,
  $ZodDate,
  $ZodDefault,
  $ZodDiscriminatedUnion,
  $ZodE164,
  $ZodEmail,
  $ZodEmoji,
  $ZodEnum,
  $ZodFile,
  $ZodGUID,
  $ZodIPv4,
  $ZodIPv6,
  $ZodIntersection,
  $ZodJWT,
  $ZodKSUID,
  $ZodLazy,
  $ZodLiteral,
  $ZodMap,
  $ZodNaN,
  $ZodNanoID,
  $ZodNever,
  $ZodNonOptional,
  $ZodNull,
  $ZodNullable,
  $ZodNumber,
  $ZodNumberFormat,
  $ZodObject,
  $ZodOptional,
  $ZodPipe,
  $ZodPrefault,
  $ZodPromise,
  $ZodReadonly,
  $ZodRecord,
  $ZodSet,
  $ZodString,
  $ZodStringFormat,
  $ZodSuccess,
  $ZodSymbol,
  $ZodTemplateLiteral,
  $ZodTransform,
  $ZodTuple,
  $ZodType,
  $ZodULID,
  $ZodURL,
  $ZodUUID,
  $ZodUndefined,
  $ZodUnion,
  $ZodUnknown,
  $ZodVoid,
  $ZodXID,
  parse,
  parseAsync,
  safeParse,
  safeParseAsync
} from "./chunk-2BD5CSCS.mjs";
import {
  $ZodCheck,
  $constructor
} from "./chunk-JDDA4D5F.mjs";
import {
  clone,
  util_exports
} from "./chunk-S4A6X5XA.mjs";

// build/node_modules/zod/v4/mini/schemas.js
var ZodMiniType = /* @__PURE__ */ $constructor("ZodMiniType", (inst, def) => {
  if (!inst._zod)
    throw new Error("Uninitialized schema in ZodMiniType.");
  $ZodType.init(inst, def);
  inst.def = def;
  inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
  inst.check = (...checks) => {
    return inst.clone(
      {
        ...def,
        checks: [
          ...def.checks ?? [],
          ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
        ]
      }
      // { parent: true }
    );
  };
  inst.clone = (_def, params) => clone(inst, _def, params);
  inst.brand = () => inst;
  inst.register = ((reg, meta) => {
    reg.add(inst, meta);
    return inst;
  });
});
var ZodMiniString = /* @__PURE__ */ $constructor("ZodMiniString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodMiniType.init(inst, def);
});
function string(params) {
  return _string(ZodMiniString, params);
}
var ZodMiniStringFormat = /* @__PURE__ */ $constructor("ZodMiniStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  ZodMiniString.init(inst, def);
});
var ZodMiniEmail = /* @__PURE__ */ $constructor("ZodMiniEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function email(params) {
  return _email(ZodMiniEmail, params);
}
var ZodMiniGUID = /* @__PURE__ */ $constructor("ZodMiniGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function guid(params) {
  return _guid(ZodMiniGUID, params);
}
var ZodMiniUUID = /* @__PURE__ */ $constructor("ZodMiniUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function uuid(params) {
  return _uuid(ZodMiniUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodMiniUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodMiniUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodMiniUUID, params);
}
var ZodMiniURL = /* @__PURE__ */ $constructor("ZodMiniURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodMiniURL, params);
}
var ZodMiniEmoji = /* @__PURE__ */ $constructor("ZodMiniEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function emoji(params) {
  return _emoji(ZodMiniEmoji, params);
}
var ZodMiniNanoID = /* @__PURE__ */ $constructor("ZodMiniNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function nanoid(params) {
  return _nanoid(ZodMiniNanoID, params);
}
var ZodMiniCUID = /* @__PURE__ */ $constructor("ZodMiniCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function cuid(params) {
  return _cuid(ZodMiniCUID, params);
}
var ZodMiniCUID2 = /* @__PURE__ */ $constructor("ZodMiniCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function cuid2(params) {
  return _cuid2(ZodMiniCUID2, params);
}
var ZodMiniULID = /* @__PURE__ */ $constructor("ZodMiniULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function ulid(params) {
  return _ulid(ZodMiniULID, params);
}
var ZodMiniXID = /* @__PURE__ */ $constructor("ZodMiniXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function xid(params) {
  return _xid(ZodMiniXID, params);
}
var ZodMiniKSUID = /* @__PURE__ */ $constructor("ZodMiniKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function ksuid(params) {
  return _ksuid(ZodMiniKSUID, params);
}
var ZodMiniIPv4 = /* @__PURE__ */ $constructor("ZodMiniIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function ipv4(params) {
  return _ipv4(ZodMiniIPv4, params);
}
var ZodMiniIPv6 = /* @__PURE__ */ $constructor("ZodMiniIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function ipv6(params) {
  return _ipv6(ZodMiniIPv6, params);
}
var ZodMiniCIDRv4 = /* @__PURE__ */ $constructor("ZodMiniCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function cidrv4(params) {
  return _cidrv4(ZodMiniCIDRv4, params);
}
var ZodMiniCIDRv6 = /* @__PURE__ */ $constructor("ZodMiniCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function cidrv6(params) {
  return _cidrv6(ZodMiniCIDRv6, params);
}
var ZodMiniBase64 = /* @__PURE__ */ $constructor("ZodMiniBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function base64(params) {
  return _base64(ZodMiniBase64, params);
}
var ZodMiniBase64URL = /* @__PURE__ */ $constructor("ZodMiniBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function base64url(params) {
  return _base64url(ZodMiniBase64URL, params);
}
var ZodMiniE164 = /* @__PURE__ */ $constructor("ZodMiniE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function e164(params) {
  return _e164(ZodMiniE164, params);
}
var ZodMiniJWT = /* @__PURE__ */ $constructor("ZodMiniJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodMiniJWT, params);
}
var ZodMiniCustomStringFormat = /* @__PURE__ */ $constructor("ZodMiniCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodMiniCustomStringFormat, format, fnOrRegex, _params);
}
var ZodMiniNumber = /* @__PURE__ */ $constructor("ZodMiniNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodMiniType.init(inst, def);
});
function number(params) {
  return _number(ZodMiniNumber, params);
}
var ZodMiniNumberFormat = /* @__PURE__ */ $constructor("ZodMiniNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodMiniNumber.init(inst, def);
});
function int(params) {
  return _int(ZodMiniNumberFormat, params);
}
function float32(params) {
  return _float32(ZodMiniNumberFormat, params);
}
function float64(params) {
  return _float64(ZodMiniNumberFormat, params);
}
function int32(params) {
  return _int32(ZodMiniNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodMiniNumberFormat, params);
}
var ZodMiniBoolean = /* @__PURE__ */ $constructor("ZodMiniBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodMiniType.init(inst, def);
});
function boolean(params) {
  return _boolean(ZodMiniBoolean, params);
}
var ZodMiniBigInt = /* @__PURE__ */ $constructor("ZodMiniBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodMiniType.init(inst, def);
});
function bigint(params) {
  return _bigint(ZodMiniBigInt, params);
}
var ZodMiniBigIntFormat = /* @__PURE__ */ $constructor("ZodMiniBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodMiniBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodMiniBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodMiniBigIntFormat, params);
}
var ZodMiniSymbol = /* @__PURE__ */ $constructor("ZodMiniSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodMiniType.init(inst, def);
});
function symbol(params) {
  return _symbol(ZodMiniSymbol, params);
}
var ZodMiniUndefined = /* @__PURE__ */ $constructor("ZodMiniUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodMiniType.init(inst, def);
});
function _undefined2(params) {
  return _undefined(ZodMiniUndefined, params);
}
var ZodMiniNull = /* @__PURE__ */ $constructor("ZodMiniNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodMiniType.init(inst, def);
});
function _null2(params) {
  return _null(ZodMiniNull, params);
}
var ZodMiniAny = /* @__PURE__ */ $constructor("ZodMiniAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodMiniType.init(inst, def);
});
function any() {
  return _any(ZodMiniAny);
}
var ZodMiniUnknown = /* @__PURE__ */ $constructor("ZodMiniUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodMiniType.init(inst, def);
});
function unknown() {
  return _unknown(ZodMiniUnknown);
}
var ZodMiniNever = /* @__PURE__ */ $constructor("ZodMiniNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodMiniType.init(inst, def);
});
function never(params) {
  return _never(ZodMiniNever, params);
}
var ZodMiniVoid = /* @__PURE__ */ $constructor("ZodMiniVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodMiniType.init(inst, def);
});
function _void2(params) {
  return _void(ZodMiniVoid, params);
}
var ZodMiniDate = /* @__PURE__ */ $constructor("ZodMiniDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodMiniType.init(inst, def);
});
function date(params) {
  return _date(ZodMiniDate, params);
}
var ZodMiniArray = /* @__PURE__ */ $constructor("ZodMiniArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodMiniType.init(inst, def);
});
function array(element, params) {
  return new ZodMiniArray({
    type: "array",
    element,
    ...util_exports.normalizeParams(params)
  });
}
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return literal(Object.keys(shape));
}
var ZodMiniObject = /* @__PURE__ */ $constructor("ZodMiniObject", (inst, def) => {
  $ZodObject.init(inst, def);
  ZodMiniType.init(inst, def);
  util_exports.defineLazy(inst, "shape", () => def.shape);
});
function object(shape, params) {
  const def = {
    type: "object",
    get shape() {
      util_exports.assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    ...util_exports.normalizeParams(params)
  };
  return new ZodMiniObject(def);
}
function strictObject(shape, params) {
  return new ZodMiniObject({
    type: "object",
    // shape: shape as core.$ZodLooseShape,
    get shape() {
      util_exports.assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    catchall: never(),
    ...util_exports.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodMiniObject({
    type: "object",
    // shape: shape as core.$ZodLooseShape,
    get shape() {
      util_exports.assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    // get optional() {
    //   return util.optionalKeys(shape);
    // },
    catchall: unknown(),
    ...util_exports.normalizeParams(params)
  });
}
function extend(schema, shape) {
  return util_exports.extend(schema, shape);
}
function merge(schema, shape) {
  return util_exports.extend(schema, shape);
}
function pick(schema, mask) {
  return util_exports.pick(schema, mask);
}
function omit(schema, mask) {
  return util_exports.omit(schema, mask);
}
function partial(schema, mask) {
  return util_exports.partial(ZodMiniOptional, schema, mask);
}
function required(schema, mask) {
  return util_exports.required(ZodMiniNonOptional, schema, mask);
}
function catchall(inst, catchall2) {
  return inst.clone({ ...inst._zod.def, catchall: catchall2 });
}
var ZodMiniUnion = /* @__PURE__ */ $constructor("ZodMiniUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodMiniType.init(inst, def);
});
function union(options, params) {
  return new ZodMiniUnion({
    type: "union",
    options,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodMiniDiscriminatedUnion", (inst, def) => {
  $ZodDiscriminatedUnion.init(inst, def);
  ZodMiniType.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodMiniDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniIntersection = /* @__PURE__ */ $constructor("ZodMiniIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodMiniType.init(inst, def);
});
function intersection(left, right) {
  return new ZodMiniIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodMiniTuple = /* @__PURE__ */ $constructor("ZodMiniTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodMiniType.init(inst, def);
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodMiniTuple({
    type: "tuple",
    items,
    rest,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniRecord = /* @__PURE__ */ $constructor("ZodMiniRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodMiniType.init(inst, def);
});
function record(keyType, valueType, params) {
  return new ZodMiniRecord({
    type: "record",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  return new ZodMiniRecord({
    type: "record",
    keyType: union([keyType, never()]),
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniMap = /* @__PURE__ */ $constructor("ZodMiniMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodMiniType.init(inst, def);
});
function map(keyType, valueType, params) {
  return new ZodMiniMap({
    type: "map",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniSet = /* @__PURE__ */ $constructor("ZodMiniSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodMiniType.init(inst, def);
});
function set(valueType, params) {
  return new ZodMiniSet({
    type: "set",
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniEnum = /* @__PURE__ */ $constructor("ZodMiniEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodMiniType.init(inst, def);
});
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodMiniEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodMiniEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniLiteral = /* @__PURE__ */ $constructor("ZodMiniLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodMiniType.init(inst, def);
});
function literal(value, params) {
  return new ZodMiniLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniFile = /* @__PURE__ */ $constructor("ZodMiniFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodMiniType.init(inst, def);
});
function file(params) {
  return _file(ZodMiniFile, params);
}
var ZodMiniTransform = /* @__PURE__ */ $constructor("ZodMiniTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodMiniType.init(inst, def);
});
function transform(fn) {
  return new ZodMiniTransform({
    type: "transform",
    transform: fn
  });
}
var ZodMiniOptional = /* @__PURE__ */ $constructor("ZodMiniOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodMiniType.init(inst, def);
});
function optional(innerType) {
  return new ZodMiniOptional({
    type: "optional",
    innerType
  });
}
var ZodMiniNullable = /* @__PURE__ */ $constructor("ZodMiniNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodMiniType.init(inst, def);
});
function nullable(innerType) {
  return new ZodMiniNullable({
    type: "nullable",
    innerType
  });
}
function nullish(innerType) {
  return optional(nullable(innerType));
}
var ZodMiniDefault = /* @__PURE__ */ $constructor("ZodMiniDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodMiniType.init(inst, def);
});
function _default(innerType, defaultValue) {
  return new ZodMiniDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
var ZodMiniPrefault = /* @__PURE__ */ $constructor("ZodMiniPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodMiniType.init(inst, def);
});
function prefault(innerType, defaultValue) {
  return new ZodMiniPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
var ZodMiniNonOptional = /* @__PURE__ */ $constructor("ZodMiniNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodMiniType.init(inst, def);
});
function nonoptional(innerType, params) {
  return new ZodMiniNonOptional({
    type: "nonoptional",
    innerType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniSuccess = /* @__PURE__ */ $constructor("ZodMiniSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodMiniType.init(inst, def);
});
function success(innerType) {
  return new ZodMiniSuccess({
    type: "success",
    innerType
  });
}
var ZodMiniCatch = /* @__PURE__ */ $constructor("ZodMiniCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodMiniType.init(inst, def);
});
function _catch(innerType, catchValue) {
  return new ZodMiniCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
var ZodMiniNaN = /* @__PURE__ */ $constructor("ZodMiniNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodMiniType.init(inst, def);
});
function nan(params) {
  return _nan(ZodMiniNaN, params);
}
var ZodMiniPipe = /* @__PURE__ */ $constructor("ZodMiniPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodMiniType.init(inst, def);
});
function pipe(in_, out) {
  return new ZodMiniPipe({
    type: "pipe",
    in: in_,
    out
  });
}
var ZodMiniReadonly = /* @__PURE__ */ $constructor("ZodMiniReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodMiniType.init(inst, def);
});
function readonly(innerType) {
  return new ZodMiniReadonly({
    type: "readonly",
    innerType
  });
}
var ZodMiniTemplateLiteral = /* @__PURE__ */ $constructor("ZodMiniTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodMiniType.init(inst, def);
});
function templateLiteral(parts, params) {
  return new ZodMiniTemplateLiteral({
    type: "template_literal",
    parts,
    ...util_exports.normalizeParams(params)
  });
}
var ZodMiniLazy = /* @__PURE__ */ $constructor("ZodMiniLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodMiniType.init(inst, def);
});
function _lazy(getter) {
  return new ZodMiniLazy({
    type: "lazy",
    getter
  });
}
var ZodMiniPromise = /* @__PURE__ */ $constructor("ZodMiniPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodMiniType.init(inst, def);
});
function promise(innerType) {
  return new ZodMiniPromise({
    type: "promise",
    innerType
  });
}
var ZodMiniCustom = /* @__PURE__ */ $constructor("ZodMiniCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodMiniType.init(inst, def);
});
function check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...util_exports.normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodMiniCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodMiniCustom, fn, _params);
}
function _instanceof(cls, params = {
  error: `Input not instance of ${cls.name}`
}) {
  const inst = custom((data) => data instanceof cls, params);
  inst._zod.bag.Class = cls;
  return inst;
}
var stringbool = (...args) => _stringbool({
  Pipe: ZodMiniPipe,
  Boolean: ZodMiniBoolean,
  String: ZodMiniString,
  Transform: ZodMiniTransform
}, ...args);
function json() {
  const jsonSchema = _lazy(() => {
    return union([string(), number(), boolean(), _null2(), array(jsonSchema), record(string(), jsonSchema)]);
  });
  return jsonSchema;
}

export {
  ZodMiniType,
  ZodMiniString,
  string,
  ZodMiniStringFormat,
  ZodMiniEmail,
  email,
  ZodMiniGUID,
  guid,
  ZodMiniUUID,
  uuid,
  uuidv4,
  uuidv6,
  uuidv7,
  ZodMiniURL,
  url,
  ZodMiniEmoji,
  emoji,
  ZodMiniNanoID,
  nanoid,
  ZodMiniCUID,
  cuid,
  ZodMiniCUID2,
  cuid2,
  ZodMiniULID,
  ulid,
  ZodMiniXID,
  xid,
  ZodMiniKSUID,
  ksuid,
  ZodMiniIPv4,
  ipv4,
  ZodMiniIPv6,
  ipv6,
  ZodMiniCIDRv4,
  cidrv4,
  ZodMiniCIDRv6,
  cidrv6,
  ZodMiniBase64,
  base64,
  ZodMiniBase64URL,
  base64url,
  ZodMiniE164,
  e164,
  ZodMiniJWT,
  jwt,
  ZodMiniCustomStringFormat,
  stringFormat,
  ZodMiniNumber,
  number,
  ZodMiniNumberFormat,
  int,
  float32,
  float64,
  int32,
  uint32,
  ZodMiniBoolean,
  boolean,
  ZodMiniBigInt,
  bigint,
  ZodMiniBigIntFormat,
  int64,
  uint64,
  ZodMiniSymbol,
  symbol,
  ZodMiniUndefined,
  _undefined2 as _undefined,
  ZodMiniNull,
  _null2 as _null,
  ZodMiniAny,
  any,
  ZodMiniUnknown,
  unknown,
  ZodMiniNever,
  never,
  ZodMiniVoid,
  _void2 as _void,
  ZodMiniDate,
  date,
  ZodMiniArray,
  array,
  keyof,
  ZodMiniObject,
  object,
  strictObject,
  looseObject,
  extend,
  merge,
  pick,
  omit,
  partial,
  required,
  catchall,
  ZodMiniUnion,
  union,
  ZodMiniDiscriminatedUnion,
  discriminatedUnion,
  ZodMiniIntersection,
  intersection,
  ZodMiniTuple,
  tuple,
  ZodMiniRecord,
  record,
  partialRecord,
  ZodMiniMap,
  map,
  ZodMiniSet,
  set,
  ZodMiniEnum,
  _enum,
  nativeEnum,
  ZodMiniLiteral,
  literal,
  ZodMiniFile,
  file,
  ZodMiniTransform,
  transform,
  ZodMiniOptional,
  optional,
  ZodMiniNullable,
  nullable,
  nullish,
  ZodMiniDefault,
  _default,
  ZodMiniPrefault,
  prefault,
  ZodMiniNonOptional,
  nonoptional,
  ZodMiniSuccess,
  success,
  ZodMiniCatch,
  _catch,
  ZodMiniNaN,
  nan,
  ZodMiniPipe,
  pipe,
  ZodMiniReadonly,
  readonly,
  ZodMiniTemplateLiteral,
  templateLiteral,
  ZodMiniLazy,
  _lazy,
  ZodMiniPromise,
  promise,
  ZodMiniCustom,
  check,
  custom,
  refine,
  _instanceof,
  stringbool,
  json
};
