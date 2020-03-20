<template>
  <div class="TemperatureRiseForecast">
    <!-- 上部 -->
    <div class="top">
      <!-- 文字输入框组合 -->
      <div class="combination">
        <div class="text">车厢编号</div>
        <div class="input">
          <el-input v-model="carriageNumber" placeholder="如89011" size="mini"></el-input>
        </div>
      </div>
      <!-- 文字输入框组合 -->
      <div class="combination">
        <div class="text">环境温度</div>
        <div class="input">
          <el-input v-model="ambientTemperature" placeholder="如10.05" size="mini"></el-input>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <div class="search">
        <el-button type="danger" size="mini" round>搜索</el-button>
      </div>
    </div>
    <!-- 图表 -->
    <!-- 左轴 -->
    <div class="echart">
      <div id="leftAxle"></div>
    </div>
    <!-- 右轴 -->
    <div class="echart">
      <div id="rightAxle"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      // 车厢编号输入框
      carriageNumber: "",
      // 环境温度输入框
      ambientTemperature: "",
      //左轴数据
      left1: [4, 3, 8, 7, 15, 20],
      left2: [10, 15, 9, 5, 3, 7],
      left3: [14, 9, 6, 10, 13, 8],
      left4: [6, 16, 7, 3, 6, 6],
      //右轴数据
      right1: [4, 3, 8, 7, 15, 20],
      right2: [10, 15, 9, 5, 3, 7],
      right3: [14, 9, 6, 10, 13, 8],
      right4: [6, 16, 7, 3, 6, 6],

      icon1:
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAYAAAAo/ezGAAAAlElEQVQokbXOLwrCcBjH4Wf+CTZ3A7EaxCwYPMOSN9DmURTEbt0NLHoCQTB6BQUtQxCUH2zF6LZPe8v3eaNPOpA3xgJ9tP3fAwesJZdnAcywQ7PE8G9nTBroYFPxeGiIZQBG6FY8XjQNQFzTeCgOwL1G4B6AE241AfsAvDDHu+Lx8PiqlR8prjnUQ1RiOMMRW8kl+wIJ9Rtl5pyxkAAAAABJRU5ErkJggg==",
      icon2:
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAYAAAAo/ezGAAAAvUlEQVQokbXSMUpDQRSF4S8z80ACNvYuQB6idhIiZCMuISLiMiQpsp2AYCFWFpJgo5WdjV1SBIJcTCR93jvFzJnL5f+b6Qwnayk5zsl9Ti5y1i2JkqnK5t70v3fnv8d8d68ky5y95WR0deoTCmo84Ugz6eP6eW7Qq70mPDQI3+YQ4+ghGDQM36b/8q4KwUFLgmB341i2JFhjEYJpS4LHyxOrENzhu2H4D26jxDf9wDlucIZqD/AKM0x6tS/4BRx1HPx+8r9CAAAAAElFTkSuQmCC",
      icon3:
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAYAAAAo/ezGAAAAdUlEQVQokbWSMQ7CQAwEd32JCCJP5Af8AZ2SP/BLOpBOifAiC7q056lczRRr1loRGPVy8YJOELgLWIe/zl1kL3kgYJlsx/C7c2g+LmbUOysQmMRTaoBUSw30HvcQADAT8Az5VPZbBOKNSqE/e8rPZbu2z/j4ArOiIel4bYGnAAAAAElFTkSuQmCC"
    };
  },
  mounted() {
    this.drawLeft();
    this.drawRight();
  },
  methods: {
    //左轴图
    drawLeft() {
      var myChart = echarts.init(document.getElementById("leftAxle"));
      var option = {
        title: {
          text: "左温升",
          textStyle: {
            fontSize: "80%"
          }
        },
        grid: {
          left: "4%",
          right: "2%",
          top: "22%",
          bottom: "10%",
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "item"
        },
        legend: {
          show: true,
          x: "right",
          top: 0,
          padding: [0, 25, 0, 0],
          // icon:
          //   "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAYAAAAo/ezGAAAAlElEQVQokbXOLwrCcBjH4Wf+CTZ3A7EaxCwYPMOSN9DmURTEbt0NLHoCQTB6BQUtQxCUH2zF6LZPe8v3eaNPOpA3xgJ9tP3fAwesJZdnAcywQ7PE8G9nTBroYFPxeGiIZQBG6FY8XjQNQFzTeCgOwL1G4B6AE241AfsAvDDHu+Lx8PiqlR8prjnUQ1RiOMMRW8kl+wIJ9Rtl5pyxkAAAAABJRU5ErkJggg==",
          // itemWidth: 20,
          itemHeight: 8,
          textStyle: {
            color: "black"
          },
          selected: {
            "2轴": false,
            "3轴": false,
            "4轴": false
          },
          data: [
            {
              name: "1轴",

              icon: this.icon1
            },
            {
              name: "2轴",
              icon: this.icon3
            },
            {
              name: "3轴",

              icon: this.icon3
            },
            {
              name: "4轴",
              icon: this.icon3
            }
          ]
        },
        xAxis: [
          {
            // type: "category",
            boundaryGap: true,
            axisLabel: {
              color: "#666666"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#d8d7d7"
              }
            },
            axisTick: {
              show: false
            },

            data: [1, 2, 3, 4, 5, 6]
          }
        ],
        yAxis: [
          {
            show: true,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#8c8c8c"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#bababa"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#e8e7e7"
              }
            },
            min: 0,
            max: 25,
            splitNumber: 5,
            interval: 25 / 5
          },
          {
            show: true,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#8c8c8c"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#bababa"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#e8e7e7"
              }
            },
            min: 0,
            max: 25,
            splitNumber: 5,
            interval: 25 / 5
          }
        ],
        series: [
          {
            name: "1轴",
            type: "line",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADH0lEQVRIia2WzU8TQRTA3+yUtlDAUojVAySQeCCoLcQDhsSbidEbCYmpnwc/OBnjxYNnD/4L6gElqSYkxKOJZwIHo0CAGI0S2wPW0FJp+eh2d8fMdikzb2eXNfElk83Ovvd++97MezME/k289FlQLyHJambIpUAmVkXIkT/IZoYkOJlY9QZ6gMQnnmPCk4kADPYFOjDRuba7lr0WJvvXqbmTBqsWt79okbJJY4s6RLNtg5lpALDEyFRQKUU8pQLMHsXP02Px8M4Lzaic8soGFyvU8a2sx+52D9+YEyJmeH3xmogwrbKSvdrOCi/BMsJ+sKZoIb1Kknc6TmfeOtG6oHhDNGGFj1Njx8Ol98DMSCBY0wut/dYTl5Lnbs+poKo1JKOp/lBP694UGAi2kwfYWgXYLzbeo90AXUMAsd5DHWZGuO1oqn9wYWm97pVSMTpaXnp96xgUnkuwzU8ApWV1VImzAD0j0tQfSN6Lp26+AgBTjFJDpvxdi7XUM67IvGBc+DeuI4jjQ3OGBBCjtQe1dlOS9ZZcvEpBOo4PgurXBhK8YYhV65SsD9bMT5CO48PlH6fU+aCZRxMCCcGlh1NqCyMtFckb341HCdJhWmRb5RtHaIuhtX6VJrrcTd0lSMcgrV9UaiKwWS/FKryRtHid8a3vJfybWIsNH1mVb2mz8M3Fm0HfyUT4x4eni9Ss9kleqnmAMi/8zcZ7tMdd+LzwaHtu4OKTdG6jpPNgnVq0u05IccRYuY2Sufxz7/5wL30ntbb23sbwE0JrK7naJPehaG0Mp7QJHbnyaGG93PYACNX9CYIQqnOb9OWH817NG28ayxn878yBC5MzC9/r4yaN5b0Yh2mM5bkutzmwF/w1RXVaHKwldZo7TXZ3tMzPPsuc6AqNR0ntDLH0TiBgmiSyrbPw2q8tY/b8+ONsoVipOyADQQ9vBAogEXogFYaGOoe07mJmUHSex5N4jFhongkw1TIwAWh5wTBQBRUNiADFNhaKNPAVA6cXEAj3RldJqW5yQYCAgKqfUAHxnKdTPwlyERad+97C+e77HxLsqg8AfwGjFUzzzBIlRAAAAABJRU5ErkJggg==",
            smooth: true,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: "#ffab2b",
                lineStyle: {
                  color: "#ffab2b",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(255,247,253,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255,209,139,0.5)"
                    }
                  ])
                }
              }
            },
            // markPoint: {
            //   itemStyle: {
            //     normal: {
            //       color: "red"
            //     }
            //   }
            // },
            data: this.left1
          },
          {
            name: "2轴",
            type: "line",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADBklEQVRIia2Wy2sTYRDA59vdJNvGPonk1kNBLyJWT9Wi4M0HihTUWkUPWi0U/At67L8giHrwAbVQkKKg3gSlVm9FQURFpD5D0ybpc5PsfiuTbNbZybfJCh34SHZ2Zn478833EPB/EmbvRo1i0IehCVlnMDWuUUjTDxyakAH41LgWDgwB0V+uc8mvSwEc3BDowWhw7dnc+vmym7hglbS+sg2d+CJmQN6My/mYVpo82t/6AAAkiaGEBkqEJSWwynj8Mjtgi67bG0WxI6waKK0J97Ph5kZOHkrNkoxdPr98TihMe/p6dahgJe84EuKNYDXRNSh1mOtXjh1om/KyrYPyhvBhMy8yAxty+3PpQiIKrCaagGKrtnjk1OH0rAqqKXzEzl39hqOn7nLYugXwYxHgy8/qwP+oo4I+6IsxVF3NOxCH/uRV7lKh2HGLGmZXAJZX1Fl1twOk2oO6jkTh6omDXfcAwKFZ8gzxWZMiOcwzC4Oh4Lu6TKsxNF5F+uBnWbSNPdQotxoOC7PxYgi2fitAwRumbEOgQFapOZDbeDHq4vOSVpRCVOq+FSJ44/CSVsTQ3UCBzAirkNvEDKCzHihpncR15xPVdbU1B3KbuG5/VNlRoL8b2NbSQ2qUNKutHyb4Dm2o2MWlSVXsQLPgGsSKptI98ZvTX+etktZDg6xtAuTX/jUIlhEz4zAzLhdGT/f2ZTMLaGl7a7Gy6xiKI0ZmMwtO7ve7a8lU3wzdbba1VEcjwa2t8Of9KMZQbG0uL6kPHTm7742wvl3XBERYFFVBW/S5fGbvXNjmzZtGegO/zjl3vHc6/+vtoBlzvjeDoQ3aok/Nn8TzRXVa1OZS9w5ovbM7Hbtxf264pS09aLvm7rIt2kGAE9PliiGKHzZXM4/GLu6fzC9nyh7IZlA/y9DjiYF1oqOL2Z8CWhmWXaCs9IpBT2bJ9C6BqabBJUAZBuNAFZQ6CALlPpJlGvmKwcsLDMT3xrolpbrJRQECA6o+QgXkutCgjSTKRZgGb3gLx+7bCol21QeAvwXlUBnMZP4DAAAAAElFTkSuQmCC",
            smooth: true,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: "#7ea0fe",
                lineStyle: {
                  color: "#4f7dfb",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(242,246,255,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(164,188,254,0.5)"
                    }
                  ])
                }
              }
            },
            // markPoint: {
            //   itemStyle: {
            //     normal: {
            //       color: "red"
            //     }
            //   }
            // },
            data: this.left2
          },
          {
            name: "3轴",
            type: "line",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADH0lEQVRIia2WzU8TQRTA3+yUtlDAUojVAySQeCCoLcQDhsSbidEbCYmpnwc/OBnjxYNnD/4L6gElqSYkxKOJZwIHo0CAGI0S2wPW0FJp+eh2d8fMdikzb2eXNfElk83Ovvd++97MezME/k289FlQLyHJambIpUAmVkXIkT/IZoYkOJlY9QZ6gMQnnmPCk4kADPYFOjDRuba7lr0WJvvXqbmTBqsWt79okbJJY4s6RLNtg5lpALDEyFRQKUU8pQLMHsXP02Px8M4Lzaic8soGFyvU8a2sx+52D9+YEyJmeH3xmogwrbKSvdrOCi/BMsJ+sKZoIb1Kknc6TmfeOtG6oHhDNGGFj1Njx8Ol98DMSCBY0wut/dYTl5Lnbs+poKo1JKOp/lBP694UGAi2kwfYWgXYLzbeo90AXUMAsd5DHWZGuO1oqn9wYWm97pVSMTpaXnp96xgUnkuwzU8ApWV1VImzAD0j0tQfSN6Lp26+AgBTjFJDpvxdi7XUM67IvGBc+DeuI4jjQ3OGBBCjtQe1dlOS9ZZcvEpBOo4PgurXBhK8YYhV65SsD9bMT5CO48PlH6fU+aCZRxMCCcGlh1NqCyMtFckb341HCdJhWmRb5RtHaIuhtX6VJrrcTd0lSMcgrV9UaiKwWS/FKryRtHid8a3vJfybWIsNH1mVb2mz8M3Fm0HfyUT4x4eni9Ss9kleqnmAMi/8zcZ7tMdd+LzwaHtu4OKTdG6jpPNgnVq0u05IccRYuY2Sufxz7/5wL30ntbb23sbwE0JrK7naJPehaG0Mp7QJHbnyaGG93PYACNX9CYIQqnOb9OWH817NG28ayxn878yBC5MzC9/r4yaN5b0Yh2mM5bkutzmwF/w1RXVaHKwldZo7TXZ3tMzPPsuc6AqNR0ntDLH0TiBgmiSyrbPw2q8tY/b8+ONsoVipOyADQQ9vBAogEXogFYaGOoe07mJmUHSex5N4jFhongkw1TIwAWh5wTBQBRUNiADFNhaKNPAVA6cXEAj3RldJqW5yQYCAgKqfUAHxnKdTPwlyERad+97C+e77HxLsqg8AfwGjFUzzzBIlRAAAAABJRU5ErkJggg==",
            smooth: true,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: "#ffab2b",
                lineStyle: {
                  color: "#ffab2b",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(255,247,253,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255,209,139,0.5)"
                    }
                  ])
                }
              }
            },
            // markPoint: {
            //   itemStyle: {
            //     normal: {
            //       color: "red"
            //     }
            //   }
            // },
            data: this.left3
          },
          {
            name: "4轴",
            type: "line",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADBklEQVRIia2Wy2sTYRDA59vdJNvGPonk1kNBLyJWT9Wi4M0HihTUWkUPWi0U/At67L8giHrwAbVQkKKg3gSlVm9FQURFpD5D0ybpc5PsfiuTbNbZybfJCh34SHZ2Zn478833EPB/EmbvRo1i0IehCVlnMDWuUUjTDxyakAH41LgWDgwB0V+uc8mvSwEc3BDowWhw7dnc+vmym7hglbS+sg2d+CJmQN6My/mYVpo82t/6AAAkiaGEBkqEJSWwynj8Mjtgi67bG0WxI6waKK0J97Ph5kZOHkrNkoxdPr98TihMe/p6dahgJe84EuKNYDXRNSh1mOtXjh1om/KyrYPyhvBhMy8yAxty+3PpQiIKrCaagGKrtnjk1OH0rAqqKXzEzl39hqOn7nLYugXwYxHgy8/qwP+oo4I+6IsxVF3NOxCH/uRV7lKh2HGLGmZXAJZX1Fl1twOk2oO6jkTh6omDXfcAwKFZ8gzxWZMiOcwzC4Oh4Lu6TKsxNF5F+uBnWbSNPdQotxoOC7PxYgi2fitAwRumbEOgQFapOZDbeDHq4vOSVpRCVOq+FSJ44/CSVsTQ3UCBzAirkNvEDKCzHihpncR15xPVdbU1B3KbuG5/VNlRoL8b2NbSQ2qUNKutHyb4Dm2o2MWlSVXsQLPgGsSKptI98ZvTX+etktZDg6xtAuTX/jUIlhEz4zAzLhdGT/f2ZTMLaGl7a7Gy6xiKI0ZmMwtO7ve7a8lU3wzdbba1VEcjwa2t8Of9KMZQbG0uL6kPHTm7742wvl3XBERYFFVBW/S5fGbvXNjmzZtGegO/zjl3vHc6/+vtoBlzvjeDoQ3aok/Nn8TzRXVa1OZS9w5ovbM7Hbtxf264pS09aLvm7rIt2kGAE9PliiGKHzZXM4/GLu6fzC9nyh7IZlA/y9DjiYF1oqOL2Z8CWhmWXaCs9IpBT2bJ9C6BqabBJUAZBuNAFZQ6CALlPpJlGvmKwcsLDMT3xrolpbrJRQECA6o+QgXkutCgjSTKRZgGb3gLx+7bCol21QeAvwXlUBnMZP4DAAAAAElFTkSuQmCC",
            smooth: true,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: "#7ea0fe",
                lineStyle: {
                  color: "#4f7dfb",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(242,246,255,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(164,188,254,0.5)"
                    }
                  ])
                }
              }
            },
            // markPoint: {
            //   itemStyle: {
            //     normal: {
            //       color: "red"
            //     }
            //   }
            // },
            data: this.left4
          }
        ]
      };
      myChart.setOption(option);

      var self = this;
      myChart.on("legendselectchanged", function(params) {
        let { selected } = params;
        // console.log(selected["3轴"]);
        // console.log(name);
        // console.log(selected[name]);
        // console.log(params)
        var i1 = selected["1轴"] ? self.icon1 : self.icon3;
        var i2 = selected["2轴"] ? self.icon2 : self.icon3;
        var i3 = selected["3轴"] ? self.icon1 : self.icon3;
        var i4 = selected["4轴"] ? self.icon2 : self.icon3;
        myChart.setOption({
          legend: {
            data: [
              {
                name: "1轴",
                icon: i1
              },
              {
                name: "2轴",
                icon: i2
              },
              {
                name: "3轴",
                icon: i3
              },
              {
                name: "4轴",
                icon: i4
              }
            ]
          }
        });
      });

      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //右轴图
    drawRight() {
      var myChart = echarts.init(document.getElementById("rightAxle"));
      var option = {
        title: {
          text: "右温升",
          textStyle: {
            fontSize: "80%"
          }
        },
        grid: {
          left: "4%",
          right: "2%",
          top: "22%",
          bottom: "10%",
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "item"
        },
        legend: {
          show: true,
          x: "right",
          top: 0,
          padding: [0, 25, 0, 0],
          // icon:
          //   "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAYAAAAo/ezGAAAAlElEQVQokbXOLwrCcBjH4Wf+CTZ3A7EaxCwYPMOSN9DmURTEbt0NLHoCQTB6BQUtQxCUH2zF6LZPe8v3eaNPOpA3xgJ9tP3fAwesJZdnAcywQ7PE8G9nTBroYFPxeGiIZQBG6FY8XjQNQFzTeCgOwL1G4B6AE241AfsAvDDHu+Lx8PiqlR8prjnUQ1RiOMMRW8kl+wIJ9Rtl5pyxkAAAAABJRU5ErkJggg==",
          // itemWidth: 20,
          itemHeight: 8,
          textStyle: {
            color: "black"
          },
          selected: {
            "1轴": false,
            "3轴": false,
            "4轴": false
          },
          data: [
            {
              name: "1轴",

              icon: this.icon3
            },
            {
              name: "2轴",
              icon: this.icon2
            },
            {
              name: "3轴",

              icon: this.icon3
            },
            {
              name: "4轴",
              icon: this.icon3
            }
          ]
        },
        xAxis: [
          {
            // type: "category",
            boundaryGap: true,
            axisLabel: {
              color: "#666666"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#d8d7d7"
              }
            },
            axisTick: {
              show: false
            },

            data: [1, 2, 3, 4, 5, 6]
          }
        ],
        yAxis: [
          {
            show: true,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#8c8c8c"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#bababa"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#e8e7e7"
              }
            },
            min: 0,
            max: 25,
            splitNumber: 5,
            interval: 25 / 5
          },
          {
            show: true,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#8c8c8c"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#bababa"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#e8e7e7"
              }
            },
            min: 0,
            max: 25,
            splitNumber: 5,
            interval: 25 / 5
          }
        ],
        series: [
          {
            name: "1轴",
            type: "line",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADH0lEQVRIia2WzU8TQRTA3+yUtlDAUojVAySQeCCoLcQDhsSbidEbCYmpnwc/OBnjxYNnD/4L6gElqSYkxKOJZwIHo0CAGI0S2wPW0FJp+eh2d8fMdikzb2eXNfElk83Ovvd++97MezME/k289FlQLyHJambIpUAmVkXIkT/IZoYkOJlY9QZ6gMQnnmPCk4kADPYFOjDRuba7lr0WJvvXqbmTBqsWt79okbJJY4s6RLNtg5lpALDEyFRQKUU8pQLMHsXP02Px8M4Lzaic8soGFyvU8a2sx+52D9+YEyJmeH3xmogwrbKSvdrOCi/BMsJ+sKZoIb1Kknc6TmfeOtG6oHhDNGGFj1Njx8Ol98DMSCBY0wut/dYTl5Lnbs+poKo1JKOp/lBP694UGAi2kwfYWgXYLzbeo90AXUMAsd5DHWZGuO1oqn9wYWm97pVSMTpaXnp96xgUnkuwzU8ApWV1VImzAD0j0tQfSN6Lp26+AgBTjFJDpvxdi7XUM67IvGBc+DeuI4jjQ3OGBBCjtQe1dlOS9ZZcvEpBOo4PgurXBhK8YYhV65SsD9bMT5CO48PlH6fU+aCZRxMCCcGlh1NqCyMtFckb341HCdJhWmRb5RtHaIuhtX6VJrrcTd0lSMcgrV9UaiKwWS/FKryRtHid8a3vJfybWIsNH1mVb2mz8M3Fm0HfyUT4x4eni9Ss9kleqnmAMi/8zcZ7tMdd+LzwaHtu4OKTdG6jpPNgnVq0u05IccRYuY2Sufxz7/5wL30ntbb23sbwE0JrK7naJPehaG0Mp7QJHbnyaGG93PYACNX9CYIQqnOb9OWH817NG28ayxn878yBC5MzC9/r4yaN5b0Yh2mM5bkutzmwF/w1RXVaHKwldZo7TXZ3tMzPPsuc6AqNR0ntDLH0TiBgmiSyrbPw2q8tY/b8+ONsoVipOyADQQ9vBAogEXogFYaGOoe07mJmUHSex5N4jFhongkw1TIwAWh5wTBQBRUNiADFNhaKNPAVA6cXEAj3RldJqW5yQYCAgKqfUAHxnKdTPwlyERad+97C+e77HxLsqg8AfwGjFUzzzBIlRAAAAABJRU5ErkJggg==",
            smooth: true,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: "#ffab2b",
                lineStyle: {
                  color: "#ffab2b",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(255,247,253,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255,209,139,0.5)"
                    }
                  ])
                }
              }
            },
            // markPoint: {
            //   itemStyle: {
            //     normal: {
            //       color: "red"
            //     }
            //   }
            // },
            data: this.right1
          },
          {
            name: "2轴",
            type: "line",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADBklEQVRIia2Wy2sTYRDA59vdJNvGPonk1kNBLyJWT9Wi4M0HihTUWkUPWi0U/At67L8giHrwAbVQkKKg3gSlVm9FQURFpD5D0ybpc5PsfiuTbNbZybfJCh34SHZ2Zn478833EPB/EmbvRo1i0IehCVlnMDWuUUjTDxyakAH41LgWDgwB0V+uc8mvSwEc3BDowWhw7dnc+vmym7hglbS+sg2d+CJmQN6My/mYVpo82t/6AAAkiaGEBkqEJSWwynj8Mjtgi67bG0WxI6waKK0J97Ph5kZOHkrNkoxdPr98TihMe/p6dahgJe84EuKNYDXRNSh1mOtXjh1om/KyrYPyhvBhMy8yAxty+3PpQiIKrCaagGKrtnjk1OH0rAqqKXzEzl39hqOn7nLYugXwYxHgy8/qwP+oo4I+6IsxVF3NOxCH/uRV7lKh2HGLGmZXAJZX1Fl1twOk2oO6jkTh6omDXfcAwKFZ8gzxWZMiOcwzC4Oh4Lu6TKsxNF5F+uBnWbSNPdQotxoOC7PxYgi2fitAwRumbEOgQFapOZDbeDHq4vOSVpRCVOq+FSJ44/CSVsTQ3UCBzAirkNvEDKCzHihpncR15xPVdbU1B3KbuG5/VNlRoL8b2NbSQ2qUNKutHyb4Dm2o2MWlSVXsQLPgGsSKptI98ZvTX+etktZDg6xtAuTX/jUIlhEz4zAzLhdGT/f2ZTMLaGl7a7Gy6xiKI0ZmMwtO7ve7a8lU3wzdbba1VEcjwa2t8Of9KMZQbG0uL6kPHTm7742wvl3XBERYFFVBW/S5fGbvXNjmzZtGegO/zjl3vHc6/+vtoBlzvjeDoQ3aok/Nn8TzRXVa1OZS9w5ovbM7Hbtxf264pS09aLvm7rIt2kGAE9PliiGKHzZXM4/GLu6fzC9nyh7IZlA/y9DjiYF1oqOL2Z8CWhmWXaCs9IpBT2bJ9C6BqabBJUAZBuNAFZQ6CALlPpJlGvmKwcsLDMT3xrolpbrJRQECA6o+QgXkutCgjSTKRZgGb3gLx+7bCol21QeAvwXlUBnMZP4DAAAAAElFTkSuQmCC",
            smooth: true,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: "#7ea0fe",
                lineStyle: {
                  color: "#4f7dfb",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(242,246,255,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(164,188,254,0.5)"
                    }
                  ])
                }
              }
            },
            // markPoint: {
            //   itemStyle: {
            //     normal: {
            //       color: "red"
            //     }
            //   }
            // },
            data: this.right2
          },
          {
            name: "3轴",
            type: "line",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADH0lEQVRIia2WzU8TQRTA3+yUtlDAUojVAySQeCCoLcQDhsSbidEbCYmpnwc/OBnjxYNnD/4L6gElqSYkxKOJZwIHo0CAGI0S2wPW0FJp+eh2d8fMdikzb2eXNfElk83Ovvd++97MezME/k289FlQLyHJambIpUAmVkXIkT/IZoYkOJlY9QZ6gMQnnmPCk4kADPYFOjDRuba7lr0WJvvXqbmTBqsWt79okbJJY4s6RLNtg5lpALDEyFRQKUU8pQLMHsXP02Px8M4Lzaic8soGFyvU8a2sx+52D9+YEyJmeH3xmogwrbKSvdrOCi/BMsJ+sKZoIb1Kknc6TmfeOtG6oHhDNGGFj1Njx8Ol98DMSCBY0wut/dYTl5Lnbs+poKo1JKOp/lBP694UGAi2kwfYWgXYLzbeo90AXUMAsd5DHWZGuO1oqn9wYWm97pVSMTpaXnp96xgUnkuwzU8ApWV1VImzAD0j0tQfSN6Lp26+AgBTjFJDpvxdi7XUM67IvGBc+DeuI4jjQ3OGBBCjtQe1dlOS9ZZcvEpBOo4PgurXBhK8YYhV65SsD9bMT5CO48PlH6fU+aCZRxMCCcGlh1NqCyMtFckb341HCdJhWmRb5RtHaIuhtX6VJrrcTd0lSMcgrV9UaiKwWS/FKryRtHid8a3vJfybWIsNH1mVb2mz8M3Fm0HfyUT4x4eni9Ss9kleqnmAMi/8zcZ7tMdd+LzwaHtu4OKTdG6jpPNgnVq0u05IccRYuY2Sufxz7/5wL30ntbb23sbwE0JrK7naJPehaG0Mp7QJHbnyaGG93PYACNX9CYIQqnOb9OWH817NG28ayxn878yBC5MzC9/r4yaN5b0Yh2mM5bkutzmwF/w1RXVaHKwldZo7TXZ3tMzPPsuc6AqNR0ntDLH0TiBgmiSyrbPw2q8tY/b8+ONsoVipOyADQQ9vBAogEXogFYaGOoe07mJmUHSex5N4jFhongkw1TIwAWh5wTBQBRUNiADFNhaKNPAVA6cXEAj3RldJqW5yQYCAgKqfUAHxnKdTPwlyERad+97C+e77HxLsqg8AfwGjFUzzzBIlRAAAAABJRU5ErkJggg==",
            smooth: true,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: "#ffab2b",
                lineStyle: {
                  color: "#ffab2b",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(255,247,253,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255,209,139,0.5)"
                    }
                  ])
                }
              }
            },
            // markPoint: {
            //   itemStyle: {
            //     normal: {
            //       color: "red"
            //     }
            //   }
            // },
            data: this.right3
          },
          {
            name: "4轴",
            type: "line",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADBklEQVRIia2Wy2sTYRDA59vdJNvGPonk1kNBLyJWT9Wi4M0HihTUWkUPWi0U/At67L8giHrwAbVQkKKg3gSlVm9FQURFpD5D0ybpc5PsfiuTbNbZybfJCh34SHZ2Zn478833EPB/EmbvRo1i0IehCVlnMDWuUUjTDxyakAH41LgWDgwB0V+uc8mvSwEc3BDowWhw7dnc+vmym7hglbS+sg2d+CJmQN6My/mYVpo82t/6AAAkiaGEBkqEJSWwynj8Mjtgi67bG0WxI6waKK0J97Ph5kZOHkrNkoxdPr98TihMe/p6dahgJe84EuKNYDXRNSh1mOtXjh1om/KyrYPyhvBhMy8yAxty+3PpQiIKrCaagGKrtnjk1OH0rAqqKXzEzl39hqOn7nLYugXwYxHgy8/qwP+oo4I+6IsxVF3NOxCH/uRV7lKh2HGLGmZXAJZX1Fl1twOk2oO6jkTh6omDXfcAwKFZ8gzxWZMiOcwzC4Oh4Lu6TKsxNF5F+uBnWbSNPdQotxoOC7PxYgi2fitAwRumbEOgQFapOZDbeDHq4vOSVpRCVOq+FSJ44/CSVsTQ3UCBzAirkNvEDKCzHihpncR15xPVdbU1B3KbuG5/VNlRoL8b2NbSQ2qUNKutHyb4Dm2o2MWlSVXsQLPgGsSKptI98ZvTX+etktZDg6xtAuTX/jUIlhEz4zAzLhdGT/f2ZTMLaGl7a7Gy6xiKI0ZmMwtO7ve7a8lU3wzdbba1VEcjwa2t8Of9KMZQbG0uL6kPHTm7742wvl3XBERYFFVBW/S5fGbvXNjmzZtGegO/zjl3vHc6/+vtoBlzvjeDoQ3aok/Nn8TzRXVa1OZS9w5ovbM7Hbtxf264pS09aLvm7rIt2kGAE9PliiGKHzZXM4/GLu6fzC9nyh7IZlA/y9DjiYF1oqOL2Z8CWhmWXaCs9IpBT2bJ9C6BqabBJUAZBuNAFZQ6CALlPpJlGvmKwcsLDMT3xrolpbrJRQECA6o+QgXkutCgjSTKRZgGb3gLx+7bCol21QeAvwXlUBnMZP4DAAAAAElFTkSuQmCC",
            smooth: true,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: "#7ea0fe",
                lineStyle: {
                  color: "#4f7dfb",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(242,246,255,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(164,188,254,0.5)"
                    }
                  ])
                }
              }
            },
            // markPoint: {
            //   itemStyle: {
            //     normal: {
            //       color: "red"
            //     }
            //   }
            // },
            data: this.right4
          }
        ]
      };
      myChart.setOption(option);
      var self = this;
      myChart.on("legendselectchanged", function(params) {
        let { selected } = params;
        // console.log(selected["3轴"]);
        // console.log(name);
        // console.log(selected[name]);
        var i1 = selected["1轴"] ? self.icon1 : self.icon3;
        var i2 = selected["2轴"] ? self.icon2 : self.icon3;
        var i3 = selected["3轴"] ? self.icon1 : self.icon3;
        var i4 = selected["4轴"] ? self.icon2 : self.icon3;
        myChart.setOption({
          legend: {
            data: [
              {
                name: "1轴",
                icon: i1
              },
              {
                name: "2轴",
                icon: i2
              },
              {
                name: "3轴",
                icon: i3
              },
              {
                name: "4轴",
                icon: i4
              }
            ]
          }
        });
      });

      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  height: 2rem;
  margin-bottom: 0.45rem;
  background-color: #fff;
  box-shadow: 1px 1px 4px 2px #e8e8e8;
  padding-left: 4%;
  .combination {
    width: 25%;
    height: 1rem;
    margin: 0.5rem 0;
    float: left;
    .text {
      width: 25%;
      height: 0.85rem;
      font-size: 0.5rem;
      padding: 0.1rem;
      color: #036fb8;
      text-align: left;
      float: left;
    }
    .input {
      width: 55%;
      height: 1rem;
      float: left;
    }
  }
  .search {
    width: 7%;
    height: 1rem;
    margin: 0.5rem 0 0.5rem -1.5%;
    float: left;
  }
}
.echart {
  height: 12.8rem;
  margin-bottom: 0.45rem;
  background-color: #fff;
  box-shadow: 1px 1px 2px 2px #e8e8e8;
  #leftAxle,
  #rightAxle {
    height: 11.8rem;
    width: 94%;
    margin: 0 2%;
    padding: 1rem 0 0 0;
  }
}
</style>
