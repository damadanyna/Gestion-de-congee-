let css = window.document.styleSheets[0];
export default class Circle {
    static drawCircle(
        id_dom,
        fill_color,
        text_color,
        background_color,
        value,
        cirlce_size,
        text_size, is_bold
    ) {
        this.creatDiv(id_dom);
        var label = document.querySelector(`#${id_dom} .inside-circle${id_dom}`);
        label.innerHTML = value + "%";
        this.setColor(
            fill_color,
            text_color,
            text_size,
            background_color,
            cirlce_size,
            id_dom, is_bold
        );
        this.setCircleSize(cirlce_size, id_dom);
        this.setPercent(Math.round((value * 180) / 100), id_dom);
    }
    static creatDiv(id_dom) {
        var div = document.getElementById(id_dom);
        div.innerHTML = ` 
        <div class="circle_wrap${id_dom}">
            <div class="circle${id_dom}">
                <!-- parti1 -->
                <div class="mask${id_dom} full-1${id_dom}">
                    <div class="fill-1${id_dom}"> </div>
                </div>
                <!-- parti2 -->
                <div class="mask${id_dom} ">
                    <div class="fill-1${id_dom}"> </div>
                </div>
                <div class="inside-circle${id_dom}"> 
                </div>
            </div>
        </div>
        `;
    }

    static setColor(
        fill_color,
        text_color,
        text_size,
        background_color,
        size,
        id_dom,
        is_bold
    ) {
        css.insertRule(
            ` .fill-1${id_dom} {
                clip: rect(0px,  ${Math.round(
                  (size * 175) / 350
                )}px, ${size}px, 0px);
                background: ${fill_color};
            } `,
            css.cssRules.length
        );
        if (is_bold) {
            css.insertRule(
                ` .inside-circle${id_dom} {
                width: ${Math.round((size * 320) / 350)}px;
                height: ${Math.round((size * 320) / 350)}px;
                background-color: ${background_color};
                border-radius: 50%;
                z-index: 1;
                position: absolute;
                margin-top: ${Math.round((size * 15) / 350)}px;
                margin-left: ${Math.round((size * 15) / 350)}px;
                align-items: center;
                text-align: center;
                display: flex;
                justify-content: center;
                color: ${text_color};
                font-size: ${text_size}px; 
            } `,
                css.cssRules.length
            );
        } else {
            css.insertRule(
                ` .inside-circle${id_dom} {
                    width: ${Math.round((size * 240) / 350)}px;
                    height: ${Math.round((size * 240) / 350)}px;
                    background-color: ${background_color};
                    border-radius: 50%;
                    z-index: 1;
                    position: absolute;
                    margin-top: ${Math.round((size * 55) / 350)}px;
                    margin-left: ${Math.round((size * 55) / 350)}px;
                    align-items: center;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    color: ${text_color};
                    font-size: ${text_size}px;
                } `,
                css.cssRules.length
            );
        }
    }

    static setPercent(val, id_dom) {
        css.insertRule(
            `@keyframes fill-1${id_dom} {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(${val}deg);
                }
            }`,
            css.cssRules.length
        );
        css.insertRule(
            `  .full-1${id_dom},
              .fill-1${id_dom} {
                animation: fill-1${id_dom} 2S forwards; 
            }`,
            css.cssRules.length
        );
    }

    static setCircleSize(size, id_dom) {
        css.insertRule(
            ` 
              .circle_wrap${id_dom} {
                background-color: rgba(128, 128, 128, 0.028);
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
            } `,
            css.cssRules.length
        );
        css.insertRule(
            `
            .mask${id_dom},
            .fill-1${id_dom} {
                width: ${size}px;
                height: ${size}px;
                position: absolute;
                border-radius: 50%;
            }`,
            css.cssRules.length
        );
        css.insertRule(
            `
            .mask${id_dom} {
                clip: rect(0px, ${size}px, ${size}px, ${Math.round(
        (size * 175) / 350
      )}px);
                /*background: rgba(255, 0, 0, 0.027);*/
                z-index: 0;
            }`,
            css.cssRules.length
        );
    }
}