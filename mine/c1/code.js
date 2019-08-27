function main()
{
    var canvas = document.getElementById("can");
    var gl = canvas.getContext("webgl");
    if(!gl)
    {
        return;
    }

    var verShaderSrc = document.getElementById("2d_vec_share").text;
    var fraShaderSRc = document.getElementById("2d_frg_shader").text;

    
}