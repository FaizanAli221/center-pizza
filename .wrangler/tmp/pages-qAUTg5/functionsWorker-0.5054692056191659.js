var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// data/menu.json
var menu_default = {
  categories: [
    {
      id: "pizza-deals",
      name: "Pizza Deals"
    },
    {
      id: "special-pizzas",
      name: "Specialty Pizzas"
    },
    {
      id: "traditional-pizzas",
      name: "Traditional Pizzas"
    },
    {
      id: "starters",
      name: "Starters & Appetizers"
    },
    {
      id: "stuffed-rolls",
      name: "Stuffed Pizza Rolls"
    },
    {
      id: "pastas-sandwiches",
      name: "Pastas & Sandwiches"
    },
    {
      id: "desserts",
      name: "Desserts"
    },
    {
      id: "drinks",
      name: "Drinks & Beverages"
    }
  ],
  items: [
    {
      id: "pd-midnight",
      name: "MIDNIGHT DEALS",
      category: "Pizza Deals",
      price: 1333,
      originalPrice: 2099,
      description: 'Deal 1: 1 Large Pizza 12" starting from 11:30 PM. Add on 500ml Coke at Rs. 150.',
      image: "/images/midnight-deal.jpg",
      isPopular: true,
      tag: "MIDNIGHT\nDEALS",
      sub: '1 LARGE PIZZA 12"',
      hue: "from-[#0f172a] to-[#1e293b]",
      dark: true
    },
    {
      id: "pd-001",
      name: "DOUBLE THE FUN - MEDIUM",
      category: "Pizza Deals",
      price: 2099,
      description: "2 Medium Pizzas of your choice, loaded with gooey cheese and premium toppings.",
      image: "/images/double-the-fun.jpg",
      isPopular: true,
      tag: "DOUBLE\nTHE FUN",
      sub: "2 MEDIUM PIZZA",
      hue: "from-[#f3f0c4] to-[#dfe9c4]"
    },
    {
      id: "pd-002",
      name: "SHARE BOX 2 PERSON",
      category: "Pizza Deals",
      price: 1699,
      description: "2 Small Pizza, 2 Pcs Garlic Bread, Spin Roll, Fries, 2 Soft Drinks.",
      image: "/images/share-box-deal.jpg",
      isPopular: true,
      tag: "SHARE THE\nLOVE",
      sub: "SHARE BOX 01",
      hue: "from-[#1f4a24] to-[#2D7A38]",
      dark: true
    },
    {
      id: "pd-combo-02",
      name: "COMBO DEAL 02",
      category: "Pizza Deals",
      price: 1099,
      description: "Stuffed Pizza Roll loaded with cheese & chicken, crispy fries, and 2 chilled soft drinks.",
      image: "/images/combo-deal-02.jpg",
      isPopular: true,
      tag: "COMBO\nDEAL 02",
      sub: "STUFFED ROLL + DRINKS"
    },
    {
      id: "pd-003",
      name: "Triple The Madness - Small",
      category: "Pizza Deals",
      price: 1449,
      description: "Triple the madness with 3 personal small pizzas in your favourite flavors.",
      image: "/images/triple-madness-small.jpg",
      isPopular: false,
      tag: "3 SMALL",
      sub: "MADNESS TRIPLE"
    },
    {
      id: "pd-004",
      name: "Triple The Madness - Medium",
      category: "Pizza Deals",
      price: 3149,
      description: "Triple the madness with 3 medium pizzas, feeds 4-6 hungry pizza lovers.",
      image: "/images/triple-madness-medium.jpg",
      isPopular: true,
      tag: "3 MEDIUM",
      sub: "BEST SELLER"
    },
    {
      id: "pd-005",
      name: "Triple The Madness - Large",
      category: "Pizza Deals",
      price: 4849,
      description: "3 large pizzas of your choice. The ultimate party pack.",
      image: "/images/triple-madness-large.jpg",
      isPopular: false,
      tag: "3 LARGE",
      sub: "FEAST PACK"
    },
    {
      id: "pd-006",
      name: "Mighty Family Platter 01",
      category: "Pizza Deals",
      price: 2599,
      description: "2 medium pizzas 10 inch, 4 pcs garlic bread, and 1 large 1.5L drink.",
      ribbon: "FAMILY SPECIAL",
      image: "/images/family-platter-01.jpg",
      isPopular: true
    },
    {
      id: "pd-007",
      name: "Mighty Family Platter 02",
      category: "Pizza Deals",
      price: 3699,
      description: "2 large 12-inch pizzas, 4 pieces of garlic bread, and 1 large 1.5L drink.",
      ribbon: "MEGA FEAST",
      image: "/images/family-platter-02.jpg",
      isPopular: false
    },
    {
      id: "pd-008",
      name: 'Jumbo Deal 16"',
      category: "Pizza Deals",
      price: 2749,
      description: "16-inch colossal Jumbo Pizza with 1.5L drink. Great for big gatherings.",
      ribbon: "JUMBO SPECIAL",
      image: "/images/jumbo-deal.jpg",
      isPopular: true
    },
    {
      id: "sp-001",
      name: "Ranch Passion Pizza",
      category: "Specialty Pizzas",
      price: 1499,
      description: "Creamy ranch sauce base topped with grilled fajita chicken, mushrooms, and bell peppers.",
      isPopular: true,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 649
        },
        {
          name: 'Medium 10"',
          price: 1499
        },
        {
          name: 'Large 12"',
          price: 2199
        },
        {
          name: 'Jumbo 16"',
          price: 2899
        }
      ],
      image: "/images/ranch-passion.jpg"
    },
    {
      id: "sp-002",
      name: "Creamy Super Max",
      category: "Specialty Pizzas",
      price: 1549,
      description: "Loaded with rich cream cheese sauce, roasted chicken tikka, sweet corn, and double mozzarella.",
      isPopular: true,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 679
        },
        {
          name: 'Medium 10"',
          price: 1549
        },
        {
          name: 'Large 12"',
          price: 2249
        },
        {
          name: 'Jumbo 16"',
          price: 2999
        }
      ],
      image: "/images/creamy-super-max.jpg"
    },
    {
      id: "sp-003",
      name: "BBQ Buzz Supreme",
      category: "Specialty Pizzas",
      price: 1449,
      description: "Smoky BBQ glazed chicken bites, caramelized red onions, capsicum, and cheddar drizzle.",
      isPopular: false,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 629
        },
        {
          name: 'Medium 10"',
          price: 1449
        },
        {
          name: 'Large 12"',
          price: 2149
        },
        {
          name: 'Jumbo 16"',
          price: 2849
        }
      ],
      image: "/images/bbq-buzz.jpg"
    },
    {
      id: "sp-004",
      name: "Cheesy Cheese Lover",
      category: "Specialty Pizzas",
      price: 1399,
      description: "Four-cheese blend of mozzarella, cheddar, parmesan, and ricotta over rich marinara.",
      isPopular: false,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 599
        },
        {
          name: 'Medium 10"',
          price: 1399
        },
        {
          name: 'Large 12"',
          price: 1999
        },
        {
          name: 'Jumbo 16"',
          price: 2699
        }
      ],
      image: "/images/cheesy-cheese-lover.jpg"
    },
    {
      id: "tp-001",
      name: "Chicken Tikka Pizza",
      category: "Traditional Pizzas",
      price: 1399,
      description: "Traditional Pakistani taste tender chicken tikka chunks with fresh onions and green herbs.",
      urdu: "\u0686\u06A9\u0646 \u0679\u06A9\u06C1 \u067E\u06CC\u0632\u0627",
      isPopular: true,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 550
        },
        {
          name: 'Medium 10"',
          price: 1399
        },
        {
          name: 'Large 12"',
          price: 1999
        },
        {
          name: 'Jumbo 16"',
          price: 2699
        }
      ],
      image: "/images/chicken-tikka.jpg"
    },
    {
      id: "tp-002",
      name: "Chicken Fajita Sicilian",
      category: "Traditional Pizzas",
      price: 1399,
      description: "Spicy Mexican style fajita chicken, capsicum, onions, jalapenos, and black olives.",
      urdu: "\u0686\u06A9\u0646 \u0641\u062C\u06CC\u062A\u0627 \u0633\u0633\u0644\u06CC\u0646",
      isPopular: true,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 550
        },
        {
          name: 'Medium 10"',
          price: 1399
        },
        {
          name: 'Large 12"',
          price: 1999
        },
        {
          name: 'Jumbo 16"',
          price: 2699
        }
      ],
      image: "/images/chicken-fajita.jpg"
    },
    {
      id: "tp-003",
      name: "SINDHI ACHARI",
      category: "Traditional Pizzas",
      price: 1399,
      fromPrice: 1399,
      description: "Spicy and tangy achari marinated chicken chunks with pickled herbs.",
      image: "/images/sindhi-achari.jpg",
      urdu: "\u0633\u0646\u062F\u06BE\u06CC \u0686\u0627\u0633",
      badgeUrdu: "\u0633\u0646\u062F\u06BE\u06CC CHASS",
      isPopular: true,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 550
        },
        {
          name: 'Medium 10"',
          price: 1399
        },
        {
          name: 'Large 12"',
          price: 1999
        },
        {
          name: 'Jumbo 16"',
          price: 2699
        }
      ]
    },
    {
      id: "tp-004",
      name: "KHYBER GREEN BOTI",
      category: "Traditional Pizzas",
      price: 1399,
      fromPrice: 1399,
      description: "Green chutney marinated succulent boti pieces with crunchy capsicum.",
      image: "/images/khyber-green-boti.jpg",
      urdu: "\u062E\u06CC\u0628\u0631 \u06AF\u0631\u06CC\u0646 \u0628\u0648\u0679\u06CC",
      badgeUrdu: "\u062E\u06CC\u0628\u0631 GREEN BOTI",
      isPopular: true,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 550
        },
        {
          name: 'Medium 10"',
          price: 1399
        },
        {
          name: 'Large 12"',
          price: 1999
        },
        {
          name: 'Jumbo 16"',
          price: 2699
        }
      ]
    },
    {
      id: "tp-005",
      name: "BALOCHI TIKKA",
      category: "Traditional Pizzas",
      price: 1399,
      fromPrice: 1399,
      description: "Smoky Balochi spice rubbed chicken breast with crisp mint leaves and lemon zest.",
      image: "/images/balochi-tikka.jpg",
      urdu: "\u0628\u0644\u0648\u0686\u06CC \u0679\u0650\u06A9\u06C1",
      badgeUrdu: "\u0628\u0644\u0648\u0686\u06CC TIKKA",
      isPopular: true,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 550
        },
        {
          name: 'Medium 10"',
          price: 1399
        },
        {
          name: 'Large 12"',
          price: 1999
        },
        {
          name: 'Jumbo 16"',
          price: 2699
        }
      ]
    },
    {
      id: "tp-006",
      name: "PUNJABI SMOKEY SEEKH",
      category: "Traditional Pizzas",
      price: 1399,
      fromPrice: 1399,
      description: "Charcoal smoked beef seekh kebab slices layered over herbs and mozzarella.",
      image: "/images/punjabi-seekh.jpg",
      urdu: "\u067E\u0646\u062C\u0627\u0628\u06CC \u0633\u0645\u0648\u06A9\u06CC \u0633\u06CC\u062E",
      badgeUrdu: "\u067E\u0646\u062C\u0627\u0628\u06CC SMOKEY SEEKH",
      isPopular: true,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 550
        },
        {
          name: 'Medium 10"',
          price: 1399
        },
        {
          name: 'Large 12"',
          price: 1999
        },
        {
          name: 'Jumbo 16"',
          price: 2699
        }
      ]
    },
    {
      id: "tp-007",
      name: "Veggie Feast Lover",
      category: "Traditional Pizzas",
      price: 1199,
      description: "A colorful celebration of mushrooms, onions, bell peppers, tomatoes, and black olives.",
      isPopular: false,
      hasCustomization: true,
      sizes: [
        {
          name: 'Small 6"',
          price: 499
        },
        {
          name: 'Medium 10"',
          price: 1199
        },
        {
          name: 'Large 12"',
          price: 1699
        },
        {
          name: 'Jumbo 16"',
          price: 2399
        }
      ],
      image: "/images/veggie-feast.jpg"
    },
    {
      id: "st-001",
      name: "Garlic Bread with Cheese",
      category: "Starters & Appetizers",
      price: 380,
      description: "4 crispy baguette slices toasted with herb butter and melted mozzarella.",
      isPopular: true,
      image: "/images/cheesy-garlic-bread.jpg"
    },
    {
      id: "st-002",
      name: "Flaming Buffalo Wings (6 Pcs)",
      category: "Starters & Appetizers",
      price: 540,
      description: "6 juicy chicken wings tossed in fiery homemade buffalo glaze, served with dip.",
      isPopular: true,
      image: "/images/buffalo-wings.jpg"
    },
    {
      id: "st-003",
      name: "Crispy Mozzarella Sticks",
      category: "Starters & Appetizers",
      price: 490,
      description: "4 golden breaded sticks filled with stringy mozzarella, served with marinara dip.",
      isPopular: false,
      image: "/images/potato-wedges.jpg"
    },
    {
      id: "st-004",
      name: "Cheesy Pizza Fries",
      category: "Starters & Appetizers",
      price: 520,
      description: "Crispy fries smothered in pizza sauce, pepperoni cubes, and melted mozzarella.",
      isPopular: true,
      image: "/images/loaded-fries.jpg"
    },
    {
      id: "st-005",
      name: "Chicken Nuggets with Honey Mustard (6 Pcs)",
      category: "Starters & Appetizers",
      price: 430,
      description: "Crispy golden bite-sized nuggets with signature honey mustard sauce.",
      isPopular: false,
      image: "/images/buffalo-wings.jpg"
    },
    {
      id: "sr-001",
      name: "Peri Peri Punch Roll",
      category: "Stuffed Pizza Rolls",
      price: 549,
      description: "Peri peri sauce with malai boti, crunchy capsicum, onion, and melted cheese in a baked roll.",
      isPopular: true,
      image: "/images/fajita-spin-roll.jpg"
    },
    {
      id: "sr-002",
      name: "Dynamite Blast Roll",
      category: "Stuffed Pizza Rolls",
      price: 549,
      description: "Dynamite spicy sauce, fajita chicken, onion, and jalapeno rolled in crispy crust.",
      isPopular: true,
      image: "/images/bihari-tikka-roll.jpg"
    },
    {
      id: "sr-003",
      name: "The Center Special Spin Roll",
      category: "Stuffed Pizza Rolls",
      price: 549,
      description: "Creamy chaska sauce with tikka meat, malai boti, capsicum, and herbs.",
      isPopular: false,
      image: "/images/center-special-roll.jpg"
    },
    {
      id: "sr-004",
      name: "Ranchy Madness Roll",
      category: "Stuffed Pizza Rolls",
      price: 549,
      description: "Tikka meat drizzled with rich ranch sauce, onion, and gooey cheese.",
      isPopular: false,
      image: "/images/ranchy-roll.jpg"
    },
    {
      id: "ps-001",
      name: "Fettuccine Alfredo Pasta",
      category: "Pastas & Sandwiches",
      price: 790,
      description: "Tender fettuccine tossed in rich parmesan cream sauce with grilled chicken and mushrooms.",
      isPopular: true,
      image: "/images/alfredo-pasta.jpg"
    },
    {
      id: "ps-002",
      name: "Spicy Chicken Sandwich",
      category: "Pastas & Sandwiches",
      price: 620,
      description: "Toasted ciabatta filled with grilled spicy breast fillet, cheddar slice, and garlic mayo.",
      isPopular: false,
      image: "/images/club-sandwich.jpg"
    },
    {
      id: "ds-001",
      name: "Chocolate Lava Cake",
      category: "Desserts",
      price: 420,
      description: "Decadent warm chocolate cake with a molten chocolate center that melts in your mouth.",
      isPopular: true,
      image: "/images/choco-lava.jpg"
    },
    {
      id: "ds-002",
      name: "Fudgy Chocolate Brownie",
      category: "Desserts",
      price: 320,
      description: "Dense, gooey chocolate brownie drizzled with warm chocolate fudge sauce.",
      isPopular: false,
      image: "/images/brownie.jpg"
    },
    {
      id: "dr-001",
      name: "Coca-Cola 1.5L",
      category: "Drinks & Beverages",
      price: 250,
      description: "1.5 Litre chilled Coca-Cola bottle.",
      isPopular: true,
      image: "/images/coke-bottle.jpg"
    },
    {
      id: "dr-002",
      name: "Sprite 1.5L",
      category: "Drinks & Beverages",
      price: 250,
      description: "1.5 Litre chilled lemon-lime Sprite bottle.",
      isPopular: false,
      image: "/images/sprite-bottle.jpg"
    },
    {
      id: "dr-003",
      name: "Coca-Cola Can 345ml",
      category: "Drinks & Beverages",
      price: 120,
      description: "345ml chilled aluminum can.",
      isPopular: false,
      image: "/images/coke-bottle.jpg"
    },
    {
      id: "dr-004",
      name: "Mineral Water 500ml",
      category: "Drinks & Beverages",
      price: 80,
      description: "Clean, refreshing purified mineral water.",
      isPopular: false,
      image: "/images/mineral-water.jpg"
    },
    {
      id: "ds-003",
      name: "Classic New York Cheesecake",
      category: "Desserts",
      price: 490,
      description: "Creamy, velvety New York style baked cheesecake with a rich graham cracker crust.",
      image: "/images/cheesecake.jpg",
      isPopular: true
    }
  ],
  cities: [
    {
      id: "khi",
      name: "Karachi",
      icon: "fort",
      branches: [
        {
          id: "khi-clifton",
          name: "Clifton Block 4",
          address: "Plot 12, Block 4, Clifton, Karachi",
          phone: "021-35874221",
          deliveryEtaMinutes: 35,
          dineIn: true,
          takeaway: true
        },
        {
          id: "khi-gulshan",
          name: "Gulshan-e-Iqbal Block 13",
          address: "Main Rashid Minhas Road, Gulshan, Karachi",
          phone: "021-34981122",
          deliveryEtaMinutes: 40,
          dineIn: true,
          takeaway: true
        },
        {
          id: "khi-dha",
          name: "DHA Phase 5 Badar Commercial",
          address: "26th Street, Badar Commercial, DHA Phase 5, Karachi",
          phone: "021-35345566",
          deliveryEtaMinutes: 30,
          dineIn: true,
          takeaway: true
        },
        {
          id: "khi-north",
          name: "North Nazimabad Block H",
          address: "Hydri Market, North Nazimabad, Karachi",
          phone: "021-36631244",
          deliveryEtaMinutes: 45,
          dineIn: false,
          takeaway: true
        },
        {
          id: "khi-tariq",
          name: "Tariq Road PECHS",
          address: "Opposite Dolmen Mall, Tariq Road, Karachi",
          phone: "021-34557890",
          deliveryEtaMinutes: 35,
          dineIn: true,
          takeaway: true
        }
      ]
    },
    {
      id: "lhr",
      name: "Lahore",
      icon: "minar",
      branches: [
        {
          id: "lhr-gulberg",
          name: "Gulberg III Main Boulevard",
          address: "Main Boulevard Gulberg III, Lahore",
          phone: "042-35756611",
          deliveryEtaMinutes: 35,
          dineIn: true,
          takeaway: true
        },
        {
          id: "lhr-johar",
          name: "Johar Town G-1 Market",
          address: "Near Shaukat Khanum, Johar Town, Lahore",
          phone: "042-35312344",
          deliveryEtaMinutes: 40,
          dineIn: true,
          takeaway: true
        },
        {
          id: "lhr-dha",
          name: "DHA Phase 6 Commercial Broadway",
          address: "Main Broadway, DHA Phase 6, Lahore",
          phone: "042-35728899",
          deliveryEtaMinutes: 30,
          dineIn: true,
          takeaway: true
        },
        {
          id: "lhr-mall",
          name: "Mall Road",
          address: "Near Anarkali, Mall Road, Lahore",
          phone: "042-37351122",
          deliveryEtaMinutes: 35,
          dineIn: true,
          takeaway: true
        }
      ]
    },
    {
      id: "isb",
      name: "Islamabad",
      icon: "building",
      branches: [
        {
          id: "isb-f7",
          name: "F-7 Markaz Jinnah Super",
          address: "Jinnah Super Market, F-7, Islamabad",
          phone: "051-2651122",
          deliveryEtaMinutes: 35,
          dineIn: true,
          takeaway: true
        },
        {
          id: "isb-g11",
          name: "G-11 Markaz",
          address: "G-11 Markaz Plaza, Islamabad",
          phone: "051-2834455",
          deliveryEtaMinutes: 40,
          dineIn: true,
          takeaway: true
        },
        {
          id: "isb-bahria",
          name: "Bahria Town Phase 4",
          address: "Civic Center, Bahria Town Phase 4, Islamabad",
          phone: "051-5730011",
          deliveryEtaMinutes: 45,
          dineIn: true,
          takeaway: true
        }
      ]
    },
    {
      id: "hyd",
      name: "Hyderabad",
      icon: "clock",
      branches: [
        {
          id: "hyd-latifabad",
          name: "Latifabad Unit 7",
          address: "Near Chandni Cinema, Latifabad Unit 7, Hyderabad",
          phone: "022-3861234",
          deliveryEtaMinutes: 40,
          dineIn: true,
          takeaway: true
        },
        {
          id: "hyd-auto",
          name: "Auto Bhan Road",
          address: "Main Auto Bhan Road, Latifabad, Hyderabad",
          phone: "022-3814455",
          deliveryEtaMinutes: 35,
          dineIn: true,
          takeaway: true
        }
      ]
    },
    {
      id: "guj",
      name: "Gujranwala",
      icon: "castle",
      branches: [
        {
          id: "guj-model-town",
          name: "Model Town Main Market",
          address: "Main Market, Model Town, Gujranwala",
          phone: "055-3841122",
          deliveryEtaMinutes: 40,
          dineIn: true,
          takeaway: true
        }
      ]
    },
    {
      id: "fsd",
      name: "Faisalabad",
      icon: "tower",
      branches: [
        {
          id: "fsd-d-ground",
          name: "D-Ground Peoples Colony",
          address: "D-Ground Commercial Area, Peoples Colony No. 1, Faisalabad",
          phone: "041-8541233",
          deliveryEtaMinutes: 40,
          dineIn: true,
          takeaway: true
        }
      ]
    },
    {
      id: "sgd",
      name: "Sargodha",
      icon: "mosque",
      branches: [
        {
          id: "sgd-university-road",
          name: "University Road",
          address: "Near University of Sargodha, University Road, Sargodha",
          phone: "048-3721100",
          deliveryEtaMinutes: 45,
          dineIn: true,
          takeaway: true
        }
      ]
    },
    {
      id: "uet",
      name: "Quetta",
      icon: "building",
      branches: [
        {
          id: "uet-jinnah-road",
          name: "Jinnah Road Commercial",
          address: "Main Jinnah Road, Quetta",
          phone: "081-2821144",
          deliveryEtaMinutes: 45,
          dineIn: true,
          takeaway: true
        }
      ]
    },
    {
      id: "mbd",
      name: "Mandi Bahauddin",
      icon: "arch",
      branches: [
        {
          id: "mbd-main-bazar",
          name: "Main Bazar Saddar",
          address: "Saddar Bazar, Mandi Bahauddin",
          phone: "0546-501122",
          deliveryEtaMinutes: 45,
          dineIn: true,
          takeaway: true
        }
      ]
    }
  ]
};

// api/[[path]].js
async function onRequest(context2) {
  const { request, params } = context2;
  const url = new URL(request.url);
  const path = params.path ? params.path.join("/") : "";
  const method = request.method;
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
  if (method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (path === "health" || path === "health/") {
    return new Response(
      JSON.stringify({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() }),
      { headers: corsHeaders }
    );
  }
  if (path === "cities" || path === "cities/") {
    return new Response(
      JSON.stringify({ cities: menu_default.cities || [] }),
      { headers: corsHeaders }
    );
  }
  if (path === "menu" || path === "menu/") {
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");
    let items = menu_default.items || [];
    if (category && category.toLowerCase() !== "all") {
      items = items.filter(
        (i) => i.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description && i.description.toLowerCase().includes(q)
      );
    }
    return new Response(
      JSON.stringify({ items, categories: menu_default.categories }),
      { headers: corsHeaders }
    );
  }
  if (path === "orders" || path === "orders/") {
    if (method === "POST") {
      try {
        const body = await request.json();
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
        const orderId = `CP-${Date.now().toString(36).toUpperCase()}-${rand}`;
        const order = {
          orderId,
          status: "confirmed",
          orderType: body.orderType || "delivery",
          city: body.city || "Karachi",
          customer: body.customer || {},
          items: body.items || [],
          totalAmount: body.totalAmount || 0,
          notes: body.notes || null,
          estimated: { deliveryEtaMinutes: 35 },
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        return new Response(
          JSON.stringify({ message: "Order placed successfully.", order }),
          { status: 201, headers: corsHeaders }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: "Bad Request", message: err.message }),
          { status: 400, headers: corsHeaders }
        );
      }
    }
  }
  if (path.startsWith("orders/")) {
    const id = path.split("/")[1]?.toUpperCase() || "UNKNOWN";
    return new Response(
      JSON.stringify({
        order: {
          orderId: id,
          status: "preparing",
          orderType: "delivery",
          city: "Karachi",
          customer: { name: "Guest Customer", phone: "0331-2130709", address: "Delivery Address" },
          items: [{ id: "pd-001", name: "Double The Fun", price: 2099, quantity: 1 }],
          totalAmount: 2199,
          estimated: { deliveryEtaMinutes: 25 },
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      }),
      { headers: corsHeaders }
    );
  }
  return new Response(
    JSON.stringify({
      service: "center-pizza-cf-functions",
      message: "Center Pizza Cloudflare Pages Functions running.",
      endpoints: [
        "GET /api/health",
        "GET /api/menu",
        "GET /api/cities",
        "POST /api/orders",
        "GET /api/orders/:id"
      ]
    }),
    { headers: corsHeaders }
  );
}
__name(onRequest, "onRequest");

// ../.wrangler/tmp/pages-qAUTg5/functionsRoutes-0.7577047895691755.mjs
var routes = [
  {
    routePath: "/api/:path*",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  }
];

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// C:/Users/Faizan Ali/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env2, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env2,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error3) {
      if (isFailOpen) {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error3;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
