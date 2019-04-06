extern crate rand;

use std::cell::RefCell;
use std::rc::Rc;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

use rand::rngs::OsRng;
use rand::seq::SliceRandom;
use rand::Rng;
use std::f64;

fn window() -> web_sys::Window {
    web_sys::window().expect("no global `window` exists")
}

fn request_animation_frame(f: &Closure<FnMut()>) {
    window()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame` OK");
}

fn document() -> web_sys::Document {
    window()
        .document()
        .expect("should have a document on window")
}

fn body() -> web_sys::HtmlElement {
    document().body().expect("document should have a body")
}

#[derive(Debug)]
pub struct Symbol {
    value: char,
    change_rate: u32,
}

#[derive(Debug)]
pub struct CharList {
    chars: Vec<Symbol>,
    x: f64,
    y: f64,
    speed: f64,
}

// This function is automatically invoked after the wasm module is instantiated.
#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    let mut i: u32 = 0;
    let mut rng = OsRng::new().unwrap();
//    let interval = 1;
    //
    let char_size = 14;
    let screen_width = window().inner_width().unwrap().as_f64().unwrap() as u32;
    let screen_height = window().inner_height().unwrap().as_f64().unwrap() as u32;
    let num_char_arrays = screen_width / char_size;

    //    println!("{}",window().inner_width().unwrap().as_f64().unwrap());
    let mut alphabet = vec![
        '田', '@', '由', '甲', '申', '甴', '电', '甶', '男', '甸', '甹', '町', '画',
        '甼', '甽', '甾', '甿', '畀', '畁', '畂', '畃', '畄', '畅', '畆', '畇', '畈',
        '畉', '畊', '畋', '界', '畍', '畎', '畏', '畐', ',', '畑',
    ];
    let mut c_l = (1..num_char_arrays)
        .map(|x| {
            let num_chars = rng.gen_range(10, alphabet.len());
            let vertical_offset = (-1 * (num_chars as i64 * 14)) as f64;
            let speed = rng.gen_range(5, 20) as f64;
            alphabet.shuffle(&mut rng);
            CharList {
                chars: alphabet[0..num_chars]
                    .to_vec()
                    .iter()
                    .map(|x| Symbol {
                        value: x.clone(),
                        change_rate: rng.gen_range(3, 10),
                    })
                    .collect::<Vec<Symbol>>(),
                x: (x * char_size) as f64,
                y: vertical_offset,
                speed,
            }
        })
        .collect::<Vec<CharList>>();
    //    web_sys::console::log_1(&format!("{:?}", c_l).into());
    let char_lists = Rc::new(RefCell::new(c_l));
    let rng_rc = Rc::new(RefCell::new(rng));

    let canvas = document()
        .get_element_by_id("canvas")
        .unwrap()
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();

    canvas.set_width(screen_width.clone());
    canvas.set_height(screen_height.clone());

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        context.clear_rect(0.0, 0.0, screen_width as f64, screen_height as f64);

        i += 1;
//        if (i % interval) == 0 {
            let new_canvas: Result<web_sys::HtmlCanvasElement, String> =
                get_canvas(Rc::clone(&char_lists), screen_width, screen_height, i.clone(), Rc::clone(&rng_rc));
            if new_canvas.is_ok() {
                context.draw_image_with_html_canvas_element(&new_canvas.unwrap(), 0.0, 0.0);
            }
//        }
        request_animation_frame(f.borrow().as_ref().unwrap());
    }) as Box<FnMut()>));

    request_animation_frame(g.borrow().as_ref().unwrap());
    Ok(())
}

pub fn get_canvas(
    c_l: Rc<RefCell<Vec<CharList>>>,
    width: u32,
    height: u32,
    frame_count: u32,
    rng: Rc<RefCell<OsRng>>,
) -> Result<web_sys::HtmlCanvasElement, String> {
    let mut char_lists = c_l.borrow_mut();
    let mut _rng = rng.borrow_mut();

    let canvas = document().create_element("canvas").unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();
    canvas.set_width(width);
    canvas.set_height(height);

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    context.set_fill_style(&JsValue::from_str("#a4f442"));

    let mut alphabet = vec![
        '田', '@', '由', '甲', '申', '甴', '电', '甶', '男', '甸', '甹', '町', '画',
        '甼', '甽', '甾', '甿', '畀', '畁', '畂', '畃', '畄', '畅', '畆', '畇', '畈',
        '畉', '畊', '畋', '界', '畍', '畎', '畏', '畐', ',', '畑',
    ];

    for cl in 0..char_lists.len() {
        if char_lists[cl].y + char_lists[cl].speed >= height as f64 {
            char_lists[cl].y = 0.0;
        } else {
            char_lists[cl].y += char_lists[cl].speed;
        }

        for ch in 0..char_lists[cl].chars.len() {
            let rand_char = if (frame_count % &char_lists[cl].chars[ch].change_rate) == 0 {
                alphabet[_rng.gen_range(0, alphabet.len() - 1)].to_string()
            } else {
                char_lists[cl].chars[ch].value.to_string()
            };
            let char_position = if char_lists[cl].y + (14.0 * ch as f64) >= height as f64 {
                ((char_lists[cl].y + (14.0 * ch as f64)) - height as f64) as f64
            } else {
                (char_lists[cl].y + (14.0 * ch  as f64)) as f64
            };
            context.fill_text(
                &rand_char,
                (14 * cl) as f64,
                char_position,
            );
        }
    }

    Ok(canvas)
}
