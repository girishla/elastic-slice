import {AngularTool} from "../../util/AngularTool";
import {Widgets} from "./directives";

    // The widgets show how to create reusable components on top of elasticslice.
    // You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
    export class SingleselectDirective {
        static $inject = ['$parse'];
        constructor($parse:ng.IParseService) {
            var directive: ng.IDirective = {};
            directive.restrict = 'E';
            directive.scope = true;

          
            (<any>directive).link = {
                'pre': function (scope:any, element:ng.IAugmentedJQuery, attrs: any) {
                    AngularTool.setupBinding($parse, scope, attrs, ["field", "size","name"]);
                    scope.agg_name = scope.field.replace(/[^a-z_0-9]/gmi, "_") + "_" + (Widgets.default_agg_count++);
                }
            }

/*            directive.template = '\
            <ul class="nav nav-list" esl-aggregation="ejs.TermsAggregation(agg_name).field(field).size(size)">\
                <li ng-repeat="bucket in aggResult.buckets">\
                    <label esl-filter="ejs.TermsFilter(field, bucket.key)">\
                        <span ng-if="!filter.enabled"><a href="" ng-click="filter.enabled=true">{{bucket.key}} <span class="muted">({{bucket.doc_count}})</span></a></span>\
                        <span ng-if="filter.enabled">{{bucket.key}} <a href="" ng-click="filter.enabled=false" class="facet-remove">x</a></span>\
                    </label>\
                </li>\
            </ul>'*/


          directive.templateUrl='app/widgets/directives/singleselect.tmpl.html';

            return directive;
        }
    }

