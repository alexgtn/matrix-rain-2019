// For more comments about what's going on here, check out the `hello_world`
// example.

import('./pkg/canvas')
    // .then((v) => {
    //     var k = 0;
    //     var interval = 60;
    //
    //     const renderLoop = () => {
    //         k+=1;
    //         if (k % interval === 0){
    //             let existingCanvas = document.getElementById('canvas');
    //             let newCanvas = v.get_canvas();
    //             if (newCanvas != null || newCanvas !== undefined)
    //                 existingCanvas.getContext('2d').drawImage(newCanvas, 0, 0);
    //         }
    //
    //         window.animationId = requestAnimationFrame(renderLoop);
    //     };
    //
    //     renderLoop();
    // })
  .catch(console.error);