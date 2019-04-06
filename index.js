// For more comments about what's going on here, check out the `hello_world`
// example.
import('./style.css')
    // .then(() => import('./pkg/canvas'))
    .then(() => import('./script'))
    .then(() => {
        document.getElementById("loading").remove();
        document.getElementById("bar").style = "visibility:visible";
    }).catch(console.error);