export const fragmentShader = `#define TWO_PI 6.28318530718
		uniform vec2 resolution;
		uniform float time;
		uniform vec2 colsrows;
		
		mat2 rotate2d(float _angle){
			return mat2(cos(_angle),-sin(_angle),
						sin(_angle),cos(_angle));
		}
		
		vec2 rotateFrom(vec2 uv, vec2 center, float angle){
			vec2 uv_ = uv - center;
			uv_ =  rotate2d(angle) * uv_;
			uv_ = uv_ + center;

			return uv_;
		}
		
		float random(float value){
			return fract(sin(value) * 43758.5453123);
		}
		
		float random(vec2 tex){
			return fract(sin(dot(tex.xy, vec2(12.9898, 78.233))) * 43758.5453123);
		}
		
		vec2 random2D(vec2 uv){
			uv = vec2(dot(uv, vec2(127.1, 311.7)), dot(uv, vec2(269.5, 183.3)));
			//return -1.0 + 2.0 * fract(sin(uv) * 43758.5453123);
			return fract(sin(uv) * 43758.5453123); //return without offset on x, y
		}

		vec3 random3D(vec3 uv){
			uv = vec3(dot(uv, vec3(127.1, 311.7, 120.9898)), dot(uv, vec3(269.5, 183.3, 150.457)), dot(uv, vec3(380.5, 182.3, 170.457)));
			return -1.0 + 2.0 * fract(sin(uv) * 43758.5453123);
		}

		float cubicCurve(float value){
			return value * value * (3.0 - 2.0 * value); // custom cubic curve
		}

		vec2 cubicCurve(vec2 value){
			return value * value * (3.0 - 2.0 * value); // custom cubic curve
		}

		vec3 cubicCurve(vec3 value){
			return value * value * (3.0 - 2.0 * value); // custom cubic curve
		}

		float noise(vec2 uv){
			vec2 iuv = floor(uv);
			vec2 fuv = fract(uv);
			vec2 suv = cubicCurve(fuv);

			float dotAA_ = dot(random2D(iuv + vec2(0.0)), fuv - vec2(0.0));
			float dotBB_ = dot(random2D(iuv + vec2(1.0, 0.0)), fuv - vec2(1.0, 0.0));
			float dotCC_ = dot(random2D(iuv + vec2(0.0, 1.0)), fuv - vec2(0.0, 1.0));
			float dotDD_ = dot(random2D(iuv + vec2(1.0, 1.0)), fuv - vec2(1.0, 1.0));

			return mix(
				mix(dotAA_, dotBB_,	suv.x),
				mix(dotCC_, dotDD_, suv.x),
				suv.y);
		}

		float noise(vec3 uv){
			vec3 iuv = floor(uv);
			vec3 fuv = fract(uv);
			vec3 suv = cubicCurve(fuv);

			float dotAA_ = dot(random3D(iuv + vec3(0.0)), fuv - vec3(0.0));
			float dotBB_ = dot(random3D(iuv + vec3(1.0, 0.0, 0.0)), fuv - vec3(1.0, 0.0, 0.0));
			float dotCC_ = dot(random3D(iuv + vec3(0.0, 1.0, 0.0)), fuv - vec3(0.0, 1.0, 0.0));
			float dotDD_ = dot(random3D(iuv + vec3(1.0, 1.0, 0.0)), fuv - vec3(1.0, 1.0, 0.0));

			float dotEE_ = dot(random3D(iuv + vec3(0.0, 0.0, 1.0)), fuv - vec3(0.0, 0.0, 1.0));
			float dotFF_ = dot(random3D(iuv + vec3(1.0, 0.0, 1.0)), fuv - vec3(1.0, 0.0, 1.0));
			float dotGG_ = dot(random3D(iuv + vec3(0.0, 1.0, 1.0)), fuv - vec3(0.0, 1.0, 1.0));
			float dotHH_ = dot(random3D(iuv + vec3(1.0, 1.0, 1.0)), fuv - vec3(1.0, 1.0, 1.0));

			float passH0 = mix(
				mix(dotAA_, dotBB_,	suv.x),
				mix(dotCC_, dotDD_, suv.x),
				suv.y);

			float passH1 = mix(
				mix(dotEE_, dotFF_,	suv.x),
				mix(dotGG_, dotHH_, suv.x),
				suv.y);

			return mix(passH0, passH1, suv.z);
		}
		
		float rect(vec2 uv, vec2 length, float smt){
			float dx = abs(uv.x - 0.5);
			float dy = abs(uv.y - 0.5);
			float lenx = 1.0 - smoothstep(length.x - smt, length.x + smt, dx);
			float leny = 1.0 - smoothstep(length.y - smt, length.y + smt, dy);
			
			return lenx * leny;
		}
		
		float rect(float x, float length, float sbe){
			float distRight = x - (0.5 + length);
			float distLeft = x - (0.5 - length);
			float edgeRight = 1.0 - smoothstep(0.0, sbe, distRight);
			float edgeLeft = 1.0 - smoothstep(0.0, sbe, distLeft);
			
			return edgeRight - edgeLeft;
		}
	
		vec3 rectRGB(vec2 uv, vec2 length, float sbe, vec2 offset){
			float R = rect(uv + offset, length, sbe);
			float G = rect(uv, length, sbe);
			float B = rect(uv - offset, length, sbe);
			
			return vec3(R, G, B);
		}
		
		vec3 rectRGB(float x, float length, float sbe, float offset){
			float R = rect(x + offset, length, sbe);
			float G = rect(x, length, sbe);
			float B = rect(x - offset, length, sbe);
			
			return vec3(R, G, B);
		}
		
		
		vec4 addGrain(vec2 uv, float time, float grainIntensity){
    		float grain = random(fract(uv * time)) * grainIntensity;
    		return vec4(vec3(grain), 1.0);
		}


		void main(){
			vec2 uv = gl_FragCoord.xy / resolution.xy;
			
			float noiseAngle1 = noise(time * 0.15 + uv * 0.5) + sin(mod(time, TWO_PI)) * 0.005;
			float noiseAngle2 = noise(time * 0.15 + uv * 0.52) + sin(mod(time, TWO_PI)) * 0.005;
			float noiseAngle3 = noise(time * 0.15 + uv * 0.54) + sin(mod(time, TWO_PI)) * 0.005;
			float noiseAngle4 = noise(time * 0.15 + uv * 0.58) + sin(mod(time, TWO_PI)) * 0.005;
			float scale = 0.75;
			vec2 scaleCenter = vec2(0.5);
			uv = (uv - scaleCenter) * scale + scaleCenter;
			
			vec2 uv1 = rotateFrom(uv, vec2(0.5), noiseAngle1 * TWO_PI);
			vec2 uv2 = rotateFrom(uv, vec2(0.5), noiseAngle2 * TWO_PI);
			vec2 uv3 = rotateFrom(uv, vec2(0.5), noiseAngle3 * TWO_PI);
			vec2 uv4 = rotateFrom(uv, vec2(0.5), noiseAngle4 * TWO_PI);
			
			//main
			vec2 cruv1 = uv1 * colsrows * vec2(0.75, 0.8);
			vec2 fuv1 = fract(cruv1);
			vec2 iuv1 = floor(cruv1);
			float speed1 = random(iuv1.y) * 0.16 + 0.1;
			
			vec2 pos1 = vec2(fuv1.x + fract(time * speed1 + random(iuv1)) * 2.0 - 1.0, fuv1.y);
			vec2 length1 = vec2(0.001, 0.15) + (random2D(iuv1) * 0.005);			
			vec3 rect1 = rectRGB(pos1, length1 * 0.1, 0.35, vec2(0.0025));
			
			//second
			vec2 cruv2 = uv2 * (colsrows * vec2(0.85, 0.75));
			vec2 fuv2 = fract(cruv2);
			vec2 iuv2 = floor(cruv2);
			float speed2 = random(iuv2.y) * 0.16 + 0.1;
			
			vec2 pos2 = vec2(fuv2.x + fract(time * speed2 + random(iuv2)) * 2.0 - 1.0, fuv2.y);
			vec2 length2 = vec2(0.01, 0.25) + (random2D(iuv2) * 0.005);			
			vec3 rect2 = rectRGB(pos2, length2, 0.25, vec2(0.0025));
			
			//third
			vec2 cruv3 = uv3 * (colsrows * vec2(0.85, 0.5));
			vec2 fuv3 = fract(cruv3);
			vec2 iuv3 = floor(cruv3);
			float speed3 = random(iuv3.y) * 0.16 + 0.15;
			
			vec2 pos3 = vec2(fuv3.x + fract(time * speed3 + random(iuv3)) * 2.0 - 1.0, fuv3.y);
			vec2 length3 = vec2(0.05, 0.25) + (random2D(iuv3) * 0.055);		
			vec3 rect3 = rectRGB(pos3, length3, 0.15, vec2(0.0025));
			
			//fourth
			vec2 cruv4 = uv4 * (colsrows * vec2(0.95, 0.35));
			vec2 fuv4 = fract(cruv4);
			vec2 iuv4 = floor(cruv4);
			float speed4 = random(iuv4.y) * 0.16 + 0.15;
			
			vec2 pos4 = vec2(fuv4.x + fract(time * speed4 + random(iuv4)) * 2.0 - 1.0, fuv4.y);
			vec2 length4 = vec2(0.05, 0.35) + (random2D(iuv4) * 0.055);		
			vec3 rect4 = rectRGB(pos4, length4, 0.15, vec2(0.0025));
	
			
			vec3 color1 =  vec3(255.0/255.0, 5.0/255.0, 80.0/255.0);
			vec3 color2 =  vec3(5.0/255.0, 128.0/255.0, 255.0/255.0);
			vec3 color3 =  vec3(125.0/255.0, 5.0/255.0, 255.0/255.0);
			vec3 color4 =  vec3(5.0/255.0, 255.0/255.0, 107.0/255.0);
			vec3 color5 =  vec3(255.0/255.0, 201.0/255.0, 5.0/255.0);
			vec3 color6 =  vec3(255.0/255.0, 126.0/255.0, 5.0/255.0);
			vec3 color7 =  vec3(255.0/255.0, 126.0/255.0, 5.0/255.0);
			vec3 color8 =  vec3(96.0/255.0, 5.0/255.0, 255.0/255.0);
			
			vec3 inc1 = smoothstep(0.25, 0.5, random(iuv1)) * color1 + color2 * (1.0 - step(0.5, random(iuv1)));
			vec3 inc2 = smoothstep(0.25, 0.5, random(iuv2)) * color3 + color4 * (1.0 - step(0.5, random(iuv2)));
			vec3 inc3 = smoothstep(0.25, 0.5, random(iuv3)) * color5 + color6 * (1.0 - step(0.5, random(iuv3)));
			vec3 inc4 = smoothstep(0.25, 0.5, random(iuv4)) * color7 + color8 * (1.0 - step(0.5, random(iuv4)));
			
			vec3 color = inc1 * rect1; 
			color += inc2 * rect2;
			color += inc3 * rect3;
			color += inc4 * rect4;
			
			vec4 grain = addGrain(uv, time, 0.075);
			
			gl_FragColor = vec4(color, 1.0) + grain;
		}`

    export const vertexShader = `void main() {
		gl_Position = vec4(position, 1.0);
	}`