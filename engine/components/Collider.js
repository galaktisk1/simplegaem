class Collider extends Component { 
    _points
    get points(){
        return this._points ?? this.gameObject.getComponent(Polygon).points
    }

    set points(points){
        this._points = points
    }
}