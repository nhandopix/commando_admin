import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bar, Line } from 'react-chartjs-2';
import { Row, Col, Select, Space, Form, Button, Spin } from 'antd';

import { Notification } from '../../../components';
// import { subMonthFromNow } from '../../../utils/helpers';
import { LayoutWrapper, TitleWrapper, BoxWrapper, TitleHeader } from '../../../assets/styles';

import { handleGetList as handleGetRegionList } from '../../regions/actions';
import { handleGetProvinces } from '../../public/actions';
import {
  handleGetCallCoverageChart,
  handleGetCallAchievementChart,
  handleGetNoncooperationReasonsChart,
  handleGetNoncooperationReasonsChartTrends,
  handleGetFridgesDisplayResultChart,
  handleGetFridgesComplianceChart
} from '../actions';

// Hiện tại chưa map ra

function get_month_list(num_of_month) {
  const options = [];

  for (let i = 0; i < num_of_month; i++) {
    let event = new Date();
    event.setMonth(event.getMonth() - i);
    options.push({
      label: (event.getMonth() + 1) + '/' + event.getFullYear(),
      value: formatDate(event)
    });
  }

  return options;
}
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export default function Chart() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [months, setMonths] = useState(() => {
    const monthList = get_month_list(6);

    return monthList;
  })

  const [query, setQuery] = useState({
    flag_report: 1,
    region: '',
    province: '',
    month: '',
  });

  const [isLoading, set_isLoading] = useState(false);
  const [chart_style, set_chart_style] = useState({'opacity':0});
  
  const [call_coverage_chart_data, set_call_coverage_chart_data] = useState([]);
  const [call_achievement_chart_data, set_call_achievement_chart_data] = useState([]);
  
  const [noncooperation_reasons_chart_data, set_noncooperation_reasons_chart_data] = useState([]);
  const [noncooperation_reasons_trends_chart_data, set_noncooperation_reasons_trends_chart_data] = useState([]);
  
  const [fridges_display_result_chart_data, set_fridges_display_result_chart_data] = useState([]);
  const [fridges_compliance_chart_data, set_fridges_compliance_chart_data] = useState([]);	

  // Charts, không có query ==> {}
  useEffect(() => {
    dispatch(handleGetCallCoverageChart({}, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
		// Hide chart
		// set_isLoading(true); // TODO - DEBUG
		
        console.log('handleGetCallCoverageChart: ', error, message, data)
        // CALL & COVERAGE - options_chart_1_1
        const call_coverage_chart_data_init = {
          labels: ["Call coverage", ["Call Mer display", "successfully"], "Call cooperation", "Fridge Coverage"],
          datasets: [
            {
            label: 'PLANNED',
            backgroundColor: '#0070c0',
            borderColor: '#0070c0',
            borderWidth: 1,
            hoverBackgroundColor: '#0070c0',
            hoverBorderColor: '#0070c0',
            data: [46800, 46800, 46800, 3900]
            },
            {
            label: 'VISITED',
            backgroundColor: '#00b050',
            borderColor: '#00b050',
            borderWidth: 1,
            hoverBackgroundColor: '#00b050',
            hoverBorderColor: '#00b050',
            data: [35000, 34500, 32000, 3800]
            }
          ],
	    };
        set_call_coverage_chart_data(call_coverage_chart_data_init);
        // % CALL ACHIEVEMENT - options_chart_1_2
        const call_achievement_chart_data_init = {
          labels: ["Sep-19", "Oct-19", "Nov-19", "Dec-19", "Jan-20", "Feb-20"],
          datasets: [
            {
              label: "CALL COVERAGE",
              fill: false,
              borderColor: "#1FB3EF",
              backgroundColor: "#00B050",
              borderWidth: 6,
              pointBorderWidth: 12,
              data: ["30", "90", "60", "10", "25", "45"]
            },
            {
              label: "COOPERATION",
              fill: false,
              borderColor: "#002447",
              backgroundColor: "#FFC000",
              borderWidth: 6,
              pointBorderWidth: 12,
              data: ["48", "69", "38", "67", "93", "56"]
            }
          ]
      
        };
        set_call_achievement_chart_data(call_achievement_chart_data_init);
		
		// NONCOOPERATION REASONS - options_chart_2_1
		const noncooperation_reasons_chart_data_init = {
			labels: [["Shop owner", "rejection"], ["Don't follow pog", "before Mer"], ["With other", "products in Fridge"]],
			datasets: [
				{
					label: 'VISITED',
					backgroundColor: '#ec145b',
					borderColor: '#ec145b',
					borderWidth: 1,
					hoverBackgroundColor: '#ec145b',
					hoverBorderColor: '#ec145b',
					data: [2900, 100, 30]
				}
			]
		};
        set_noncooperation_reasons_chart_data(noncooperation_reasons_chart_data_init);
		// NONCOOPERATION REASONS TRENDS - options_chart_2_2
		const noncooperation_reasons_trends_chart_data_init = {
			labels: ["Sep-19", "Oct-19", "Nov-19", "Dec-19", "Jan-20", "Feb-20"],
			datasets: [
			  {
				label: ["Shop owner", "rejection"],
				backgroundColor: "#EC145B",
				data: [40, 59, 56, 58, 12, 59],
			  },
			  {
				label: ["Don't follow pog", "before Mer"],
				backgroundColor: "#FFC000",
				data: [12, 59, 56, 59, 85, 23],
			  },
			  {
				label: ["With other", "products in Fridge"],
				backgroundColor: "#005884",
				data: [12, 59, 58, 12, 59, 65],
			  }
			],
		  };
        set_noncooperation_reasons_trends_chart_data(noncooperation_reasons_trends_chart_data_init);
		
		// FRIDGES DISPLAY RESULT - options_chart_3_1
		const fridges_display_result_chart_data_init = {
			labels: [["Fridges", "compliance"], ["Planogram", "compliance"], ["Full-charge", "compliance"], ["Purity"], ["Fridge", "works well"]],
			datasets: [
				{
					backgroundColor: '#00b050',
					borderColor: '#00b050',
					borderWidth: 1,
					hoverBackgroundColor: '#00b050',
					hoverBorderColor: '#00b050',
					data: [80, 90, 80, 99, 100]
				}
			],
		};
        set_fridges_display_result_chart_data(fridges_display_result_chart_data_init);
        // % FRIDGES COMPLIANCE - options_chart_3_2
        const fridges_compliance_chart_data_init = {
          labels: ["Sep-19", "Oct-19", "Nov-19", "Dec-19", "Jan-20", "Feb-20"],
          datasets: [
            {
              label: "",
              fill: false,
              borderColor: "#1FB3EF",
              backgroundColor: "#00B050",
              borderWidth: 6,
              pointBorderWidth: 12,
              data: ["30", "90", "60", "10", "25", "45"]
            },
          ]
      
        };
        set_fridges_compliance_chart_data(fridges_compliance_chart_data_init);
      }
    }));

    // dispatch(handleGetCallAchievementChart({}, ({ error, message, data }) => {
    //   if (error) {
    //     Notification('error', message);
    //   } else {
    //     console.log('handleGetCallAchievementChart: ', error, message, data)
        
    //   }
    // }));

    
    // dispatch(handleGetNoncooperationReasonsChart({}, ({ error, message, data }) => {
    //   if (error) {
    //     Notification('error', message);
    //   } else {
    //     console.log('handleGetNoncooperationReasonsChart: ', error, message, data)
    //   }
    // }));

    // dispatch(handleGetNoncooperationReasonsChartTrends({}, ({ error, message, data }) => {
    //   if (error) {
    //     Notification('error', message);
    //   } else {
    //     console.log('handleGetNoncooperationReasonsChartTrends: ', error, message, data)
    //   }
    // }));

    // dispatch(handleGetFridgesDisplayResultChart({}, ({ error, message, data }) => {
    //   if (error) {
    //     Notification('error', message);
    //   } else {
    //     console.log('handleGetFridgesDisplayResultChart: ', error, message, data)
    //   }
    // }));

    // dispatch(handleGetFridgesComplianceChart({}, ({ error, message, data }) => {
    //   if (error) {
    //     Notification('error', message);
    //   } else {
    //     console.log('handleGetFridgesComplianceChart: ', error, message, data)
    //   }
    // }));

  }, []);

  // Filter
  useEffect(() => {
    dispatch(handleGetRegionList({}, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setRegions(data);
      }
    }));

    dispatch(handleGetProvinces('VNM', ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setProvinces(data)
      }
    }));
  }, []);

  const options_chart_1_1 = {
    animation: {
      onComplete: function (animation) {
        let ctx = this.chart.ctx;
        let chart = this;
        ctx.fillStyle = '#000';
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "12px sans-serif";

        let datasets = this.config.data.datasets;
        datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (p, j) {
            ctx.fillText(datasets[i].data[j], p._model.x, p._model.y);
          });
        });
      }
    },
    legend: {
      labels: {
        fontColor: '#000'
      }
    },
    title: {
      display: true,
      text: 'CALL & COVERAGE',
      fontSize: 30,
      fontColor: '#000'
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
      }],
      yAxes: [{
        display: false,
        gridLines: {
          display: false,
          drawBorder: false
        },
      }]
    },
    tooltips: { enabled: false },
    events: [], // off hover
  };
  const options_chart_1_2 = {
    animation: {
      onComplete: function (animation) {
        let ctx = this.chart.ctx;
        let chart = this;
        ctx.fillStyle = '#000';
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "12px sans-serif";

        let datasets = this.config.data.datasets;
        datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (p, j) {
            ctx.fillText(datasets[i].data[j] + '%', p._model.x, p._model.y - 10);
          });
        });
      }
    },
    title: {
      display: true,
      text: '% CALL ACHIEVEMENT',
      fontSize: 30,
      fontColor: '#000'
    },
    tooltips: { enabled: false },
    events: [], // off hover
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
          drawBorder: false
        },
      }],
      yAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
        stacked: true,
        ticks: {
          beginAtZero: true,
          display: false
        },
        type: 'linear',
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
  };

  const options_chart_2_1 = {
    animation: {
      onComplete: function (animation) {
        let ctx = this.chart.ctx;
        let chart = this;
        ctx.fillStyle = '#000';
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "12px sans-serif";

        let datasets = this.config.data.datasets;
        datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (p, j) {
            ctx.fillText(datasets[i].data[j], p._model.x, p._model.y);
          });
        });
      }
    },
    legend: {
      labels: {
        fontColor: '#000'
      }
    },
    title: {
      display: true,
      text: 'NONCOOPERATION REASONS',
      fontSize: 30,
      fontColor: '#000'
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
      }],
      yAxes: [{
        display: false,
        gridLines: {
          display: false,
          drawBorder: false
        },
      }]
    },
    tooltips: { enabled: false },
    events: [], // off hover
  };
  const options_chart_2_2 = {
    animation: {
      onComplete: function (animation) {
        let ctx = this.chart.ctx;
        let chart = this;
        ctx.fillStyle = '#000';
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "12px sans-serif";

        let datasets = this.config.data.datasets;
        datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (p, j) {
            ctx.fillText(datasets[i].data[j], p._model.x, p._model.y + 20);
          });
        });
      }
    },
    title: {
      display: true,
      text: 'NONCOOPERATION REASONS TRENDS',
      fontSize: 30,
      fontColor: '#000'
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
          drawBorder: false
        },
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
    tooltips: { enabled: false },
    events: [], // off hover
  };

  const options_chart_3_1 = {
    animation: {
      onComplete: function (animation) {
        let ctx = this.chart.ctx;
        let chart = this;
        ctx.fillStyle = '#000';
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "12px sans-serif";

        let datasets = this.config.data.datasets;
        datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (p, j) {
            ctx.fillText(datasets[i].data[j] + '%', p._model.x, p._model.y);
          });
        });
      }
    },
    legend: {
      display: false,
      labels: {
        fontColor: '#000'
      }
    },
    title: {
      display: true,
      text: 'FRIDGES DISPLAY RESULT',
      fontSize: 30,
      fontColor: '#000'
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
      }],
      yAxes: [{
        display: false,
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          min: 0,
          max: 100
        }
      }]
    },
    tooltips: { enabled: false },
    events: [], // off hover
  };
  const options_chart_3_2 = {
    animation: {
      onComplete: function (animation) {
        let ctx = this.chart.ctx;
        let chart = this;
        ctx.fillStyle = '#000';
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "12px sans-serif";

        let datasets = this.config.data.datasets;
        datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (p, j) {
            ctx.fillText(datasets[i].data[j] + '%', p._model.x, p._model.y - 10);
          });
        });
      }
    },
    title: {
      display: true,
      text: 'FRIDGES COMPLIANCE',
      fontSize: 30,
      fontColor: '#000'
    },
    tooltips: { enabled: false },
    events: [], // off hover
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
          drawBorder: false
        },
      }],
      yAxes: [{
        gridLines: {
          display: false,
          drawBorder: false
        },
        stacked: true,
        ticks: {
          beginAtZero: true,
          display: false
        },
        type: 'linear',
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onStatisticsButtonClick = () => {
    // Show loading
	set_isLoading(true);
	// set_chart_style({'opacity':0});
    dispatch(handleGetCallCoverageChart(query, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        console.log('handleGetCallCoverageChart: ', error, message, data)
        set_call_coverage_chart_data(data.call_coverage_chart_data);
        set_call_achievement_chart_data(data.call_achievement_chart_data);
        set_noncooperation_reasons_chart_data(data.noncooperation_reasons_chart_data);
        set_noncooperation_reasons_trends_chart_data(data.noncooperation_reasons_trends_chart_data);
        set_fridges_display_result_chart_data(data.fridges_display_result_chart_data);
        set_fridges_compliance_chart_data(data.fridges_compliance_chart_data);
		
		// Hide loading
		set_isLoading(false);
		set_chart_style({'opacity':1});
      }
    }));
  };

  return (
    <LayoutWrapper>
      <TitleWrapper>
        <TitleHeader>Charts</TitleHeader>
      </TitleWrapper>

      <BoxWrapper>
        <Form
          form={form}
          layout="inline"
          size="large"
          onFinish={onFinish}
        >
          <Form.Item name="region">
            <Select
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder="Chọn Region"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) >= 0
              }
              onChange={(value) => setQuery({ ...query, region: value })}
            >
              <Select.Option value=''>Tất cả</Select.Option>
              {
                regions.map((item) => (
                  <Select.Option key={item.id} value={item.id}>{item.label}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item name="province">
            <Select
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder="Chọn tỉnh thành"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) >= 0
              }
              onChange={(value) => setQuery({ ...query, province: value })}
            >
              <Select.Option value=''>Tất cả</Select.Option>
              {
                provinces.map((item) => (
                  <Select.Option key={item.code} value={item.code}>{item.name}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" onClick={onStatisticsButtonClick}>Thống kê</Button>
        </Form>
      </BoxWrapper>
		
	  <Spin spinning={isLoading}>
      <Row gutter={[16, 16]} style={chart_style}>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <BoxWrapper>
                <Bar
                  data={call_coverage_chart_data}
                  height={500}
                  options={options_chart_1_1}
                />
              </BoxWrapper>
            </Col>
            <Col span={24}>
              <BoxWrapper>
                <Line
                  data={call_achievement_chart_data}
                  height={500}
                  options={options_chart_1_2}
                />
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <BoxWrapper>
                <Bar
                  data={noncooperation_reasons_chart_data}
                  height={500}
                  options={options_chart_2_1}
                />
              </BoxWrapper>
            </Col>
            <Col span={24}>
              <BoxWrapper>
                <Bar
                  data={noncooperation_reasons_trends_chart_data}
                  height={500}
                  options={options_chart_2_2}
                />
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <BoxWrapper>
                <Bar
                  data={fridges_display_result_chart_data}
                  height={500}
                  options={options_chart_3_1}
                />
              </BoxWrapper>
            </Col>
            <Col span={24}>
              <BoxWrapper>
                <Line
                  data={fridges_compliance_chart_data}
                  height={500}
                  options={options_chart_3_2}
                />
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
      </Row>
	  </Spin>
    </LayoutWrapper>
  );
}
