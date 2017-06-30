import {
  AfterViewInit, Component, Input, NgZone, OnInit, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { AppSettings } from '../../../../../app.settings';
import { DeviceFieldService } from '../../../../../core/services/device-field-service';
import {
  DeviceValueHistoryService
} from '../../../../../core/services/device-value-history.service';
import { ChartJsComponent } from '../../../../../shared/graphs/chart-js';
import { NotificationService } from '../../../../../shared/utils/notification.service';

declare var moment: any;
declare var $: any;
@Component({
  selector: 'zone-control-execution',
  templateUrl: './zone-control-execution.component.html',
  styleUrls: ['./zone-control-execution.component.scss']
})
export class ZoneControlExecutionComponent {
  fields: any[];

  fieldCharts: any[] = [];

  // To keep refenrence chart component (used for update chart data later)
  fieldChartComponents: any[] = [];
  @ViewChildren('fieldChartEles') fieldChartEles: QueryList<ChartJsComponent>;

  // To handle chart show/hide
  fieldChartViews: boolean[] = [];

  zone_id: number;
  options;
  data;

  charjsOptions = {
    legend: {
      display: false
    },
    scales: {
        yAxes: [{
            type: 'category',
            position: 'left',
            display: true,
        }]
    }
  };

  constructor(private route: ActivatedRoute,
              private deviceFieldService: DeviceFieldService,
              private deviceValueHistoryService: DeviceValueHistoryService,
              private ngZone: NgZone,
              private notificationService: NotificationService) {
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    var rules_basic = {
  condition: 'AND',
  rules: [{
    id: 'price',
    operator: 'less',
    value: 10.25
  }, {
    condition: 'OR',
    rules: [{
      id: 'category',
      operator: 'equal',
      value: 2
    }, {
      id: 'category',
      operator: 'equal',
      value: 1
    }]
  }]
};

$('#builder-basic').queryBuilder({
  plugins: ['bt-tooltip-errors'],
  
  filters: [{
    id: 'name',
    label: 'Name',
    type: 'string'
  }, {
    id: 'category',
    label: 'Category',
    type: 'integer',
    input: 'select',
    values: {
      1: 'Books',
      2: 'Movies',
      3: 'Music',
      4: 'Tools',
      5: 'Goodies',
      6: 'Clothes'
    },
    operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
  }, {
    id: 'in_stock',
    label: 'In stock',
    type: 'integer',
    input: 'radio',
    values: {
      1: 'Yes',
      0: 'No'
    },
    operators: ['equal']
  }, {
    id: 'price',
    label: 'Price',
    type: 'double',
    validation: {
      min: 0,
      step: 0.01
    }
  }, {
    id: 'id',
    label: 'Identifier',
    type: 'string',
    placeholder: '____-____-____',
    operators: ['equal', 'not_equal'],
    validation: {
      format: /^.{4}-.{4}-.{4}$/
    }
  }],

  rules: rules_basic
});

$('#btn-reset').on('click', function() {
  $('#builder-basic').queryBuilder('reset');
});

$('#btn-set').on('click', function() {
  $('#builder-basic').queryBuilder('setRules', rules_basic);
});

$('#btn-get').on('click', function() {
  var result = $('#builder-basic').queryBuilder('getRules');
  
  if (!$.isEmptyObject(result)) {
    alert(JSON.stringify(result, null, 2));
  }
});
  }

}
