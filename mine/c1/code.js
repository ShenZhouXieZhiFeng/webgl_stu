/* eslint no-console:0 consistent-return:0 */
"use strict";

function createShader(gl, type, source)
{
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function createProgram(gl, verShader, fraShader)
{
    var program = gl.createProgram();
    gl.attachShader(program, verShader);
    gl.attachShader(program, fraShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success)
    {
        return program;
    }
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function main()
{
    var canvas = document.getElementById("can");
    var gl = canvas.getContext("webgl");
    if (!gl)
    {
        return;
    }

    var verShaderSrc = document.getElementById("2d_vec_shader").text;
    var fraShaderSRc = document.getElementById("2d_frg_shader").text;

    var verShader = createShader(gl, gl.VERTEX_SHADER, verShaderSrc);
    var fraShader = createShader(gl, gl.FRAGMENT_SHADER, fraShaderSRc);

    var program = createProgram(gl, verShader, fraShader);

    var posLoc = gl.getAttribLocation(program, "a_position");

    var posBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

    var poss = [
        0, 0,
        0, 0.5,
        0.7, 0
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(poss), gl.STATIC_DRAW);

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.enableVertexAttribArray(posLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(posLoc, size, type, normalize, stride, offset);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
}

main();