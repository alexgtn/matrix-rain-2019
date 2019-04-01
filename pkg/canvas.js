import * as wasm from './canvas_bg';

/**
* @returns {void}
*/
export function run() {
    return wasm.run();
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

export function __widl_instanceof_CanvasRenderingContext2D(idx) { return getObject(idx) instanceof CanvasRenderingContext2D ? 1 : 0; }

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    if (typeof(heap_next) !== 'number') throw new Error('corrupt heap');

    heap[idx] = obj;
    return idx;
}

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

export function __widl_f_draw_image_with_html_canvas_element_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, exnptr) {
    try {
        getObject(arg0).drawImage(getObject(arg1), arg2, arg3);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_set_fill_style_CanvasRenderingContext2D(arg0, arg1) {
    try {
        getObject(arg0).fillStyle = getObject(arg1);
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __widl_f_fill_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {
    try {
        getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __widl_f_fill_text_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        getObject(arg0).fillText(varg1, arg3, arg4);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_create_element_Document(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).createElement(varg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {

        const val = getObject(arg0).getElementById(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __widl_instanceof_HTMLCanvasElement(idx) { return getObject(idx) instanceof HTMLCanvasElement ? 1 : 0; }

export function __widl_f_get_context_HTMLCanvasElement(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {

        const val = getObject(arg0).getContext(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_set_width_HTMLCanvasElement(arg0, arg1) {
    try {
        getObject(arg0).width = arg1;
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __widl_f_set_height_HTMLCanvasElement(arg0, arg1) {
    try {
        getObject(arg0).height = arg1;
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __widl_instanceof_Window(idx) { return getObject(idx) instanceof Window ? 1 : 0; }

export function __widl_f_request_animation_frame_Window(arg0, arg1, exnptr) {
    try {
        return getObject(arg0).requestAnimationFrame(getObject(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_document_Window(arg0) {
    try {

        const val = getObject(arg0).document;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __widl_f_inner_width_Window(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).innerWidth);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_inner_height_Window(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).innerHeight);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __wbg_newnoargs_b4526aa2a6db81de(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(new Function(varg0));
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __wbg_call_a7a8823c404228ab(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __wbg_new_3a746f2619705add(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(new Function(varg0));
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __wbg_call_f54d3a6dadb199ca(arg0, arg1) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __wbg_self_ac379e780a0d8b94(arg0) {
    try {
        return addHeapObject(getObject(arg0).self);
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __wbg_crypto_1e4302b85d4f64a2(arg0) {
    try {
        return addHeapObject(getObject(arg0).crypto);
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __wbg_getRandomValues_1b4ba144162a5c9e(arg0) {
    try {
        return addHeapObject(getObject(arg0).getRandomValues);
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

export function __wbg_getRandomValues_1ef11e888e5228e9(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    try {
        getObject(arg0).getRandomValues(varg1);
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __wbg_require_6461b1e9a0d7c34a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(require(varg0));
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __wbg_randomFillSync_1b52c8482374c55b(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    try {
        getObject(arg0).randomFillSync(varg1);
    } catch (e) {
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", e);
        throw e;
    }
}

export function __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }

export function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number') return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

export function __wbindgen_is_undefined(i) { return getObject(i) === undefined ? 1 : 0; }

let cachedTextEncoder = new TextEncoder('utf-8');

let WASM_VECTOR_LEN = 0;

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {

        if (typeof(arg) !== 'string') throw new Error('expected a string argument');

        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let writeOffset = 0;
        while (true) {
            const view = getUint8Memory().subarray(ptr + writeOffset, ptr + size);
            const { read, written } = cachedTextEncoder.encodeInto(arg, view);
            arg = arg.substring(read);
            writeOffset += written;
            if (arg.length === 0) {
                break;
            }
            ptr = wasm.__wbindgen_realloc(ptr, size, size * 2);
            size *= 2;
        }
        WASM_VECTOR_LEN = writeOffset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {

        if (typeof(arg) !== 'string') throw new Error('expected a string argument');

        const buf = cachedTextEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    };
}

export function __wbindgen_debug_string(i, len_ptr) {
    const debug_str =
    val => {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
;
const toString = Object.prototype.toString;
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

export function __wbindgen_cb_drop(i) {
    const obj = takeObject(i).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return 1;
    }
    return 0;
}

export function __wbindgen_jsval_eq(a, b) { return getObject(a) === getObject(b) ? 1 : 0; }

export function __wbindgen_rethrow(idx) { throw takeObject(idx); }

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

export function __wbindgen_closure_wrapper416(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(23);
    const d = wasm.__wbg_function_table.get(24);
    const cb = function() {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b);

        } finally {
            if (--this.cnt === 0) d(a, b);
            else this.a = a;

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_object_clone_ref(idx) {
    return addHeapObject(getObject(idx));
}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

wasm.__wbindgen_start();

