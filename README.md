# ng-tipService

an angular service of anywhere tips

## Getting Started

Direct reference
```
<script src="lib/jquery/jquery-2.1.3.min.js"></script>
<script src="lib/angular/angular.js"></script>
<script src="common/services/tipService.js"></script>
```
Or use ocLazyLoad

index.html
```
<script src="lib/jquery/jquery-2.1.3.min.js"></script>
<script src="lib/angular/angular.js"></script>
```
app.js
```
angular.module('app')
    .config(["$ocLazyLoadProvider", function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            catch: true,
            events: true,
            modules: [{
                name: 'yourModule',
                files: [
                    ....
                    'common/services/tipService.js',
                    ....
                ]
            }
```
### Prerequisites

Dependence angularjs 1.3.x, Jquery 2.1.x. At that time in a hurry, so use jquery, restructure later...
```
<script src="lib/jquery/jquery-2.1.3.min.js"></script>
<script src="lib/angular/angular.js"></script>
```

### Installing

Install with git

```
git clone https://github.com/kingzez/ng-tip-service.git
```


### Coding

In your module what you want use tipService ，dependency injection it

```
angular.module('app')
.controller('youController', ['$scope', 'tipsService',
    function($scope, tipsService) {
    ...

    /**
     * @msg String -your message
     * @time Number -disappear time
     * @type String -success/info/error/warn
     */
    tipsService.message(msg, time, type);

    ...
}

```
![](http://7xkghm.com1.z0.glb.clouddn.com/succ.png)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
