varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 ambientColor;

void main() {
    vec4 texColor = texture2D(uSampler, vTextureCoord);
    float average = (texColor.r + texColor.g + texColor.b) / 3.0;
    gl_FragColor = texColor * ambientColor;
}