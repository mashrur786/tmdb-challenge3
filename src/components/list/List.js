import {Lightning} from "wpe-lightning-sdk";
import Item from "../item";

export default class List extends Lightning.Component {
    static _template() {
        return {

            Focus: {
                /**
                 * @ todo: Your goal is to add a focus indicator. Please take a look at the video
                 * and inspect the rectanle frame that's before the focused movie item.
                 * extra: Animate it a bit when the focus changes to the next item
                 */
                texture: lng.Tools.getRoundRect(245, 355, 6, 8, 0xff03b3e4, false, 0x00000000),
                colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4,
                zIndex: 12,
                x: -37,
                y: 112,
                alpha: 0,
                transitions: {
                    alpha: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    w: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Metadata: {
                /**
                 * @todo: Your goal is to add a component that have multiple text labels,
                 * 1 for the Title of the selected asset and 1 for the genre.
                 */
                rect: true,
                color: 0x00000000,
                w: 9060,
                h: 400,
                y: -100,
                alpha: 0,
                transitions: {
                    alpha: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    w: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                Title: {
                    text: {
                        fontFace : 'SourceSansPro-Bold',
                        fontSize: 90,
                        text: 'Title',
                        textColor: 0xffffffff,
                    }
                },
                Genre: {
                    y: 130,
                    text: {
                        fontFace : 'SourceSansPro-Regular',
                        fontSize: 60,
                        text: 'Genre',
                        textColor: 0xff00ffff,
                    }
                }
            },
            Items: {
                y: 120, forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                signals: {

                }
            },
        }
    }

    _init() {
        this._index = 0;
    }

    _handleLeft(){
        this.setIndex(Math.max(0, --this._index));
    }

    _handleRight(){
        this.setIndex(Math.min(++this._index, this.items.length - 1));
    }

    /**
     * @todo:
     * Implement working setIndex method
     * that stores index and position movie component to focus
     * on selected item
     */
    setIndex(idx){
        // store new index
        this._index = idx;

        // update position
        this.tag("Items").setSmooth("x",  idx * -220 );
    }

    set label(v) {
        // @todo: update list title
    }

    set movies(v) {
        // we add an array of object with type: Item
        this.tag("Items").children = v.map((movie, index)=>{
            return {
                type: Item,
                item: movie,
                x: index * (Item.width + Item.offset)
            };
        });
    }

    _focus() {

        this.tag("Focus").setSmooth("alpha", 1);
        this.tag("Metadata").setSmooth("alpha", 1);
    }

    _unfocus() {
        this.tag("Focus").setSmooth("alpha", 0);
        this.tag("Metadata").setSmooth("alpha", 0);
    }

    $updateMeta(focusedMovieItem){
       // console.log(focusedMovieItem);
       this.tag('Metadata').patch({
         Title : { text : focusedMovieItem.title }
       })
    }

    get items() {
        return this.tag("Items").children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _getFocused() {
        return this.activeItem;
    }
}
