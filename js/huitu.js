let chartInstance = null; // 全局变量，用于存储图表实例

export function createLineChart(canvasId, records, biao, options = {}) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // 如果已有图表实例，先销毁它
    if (chartInstance) {
        chartInstance.destroy();
    }

    // 提取时间数据和其他数据
    const datasets = records.map((record, index) => ({
        label: `${biao}`,
        data: record.times, // 假设每个记录包含一个 `times` 数组
        fill: false,
        borderColor: getRandomColor(), // 为每条折线随机分配颜色
        tension: 0.1
    }));

    // 默认选项
    const defaultOptions = {
        data: {
            labels: records[0]?.times.map((_, index) => `${index + 1}`) || [], // 使用第一个数据集的长度作为 X 轴标签
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: biao
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '训练次数'
                    }
                }
            }
        }
    };

    // 合并用户选项和默认选项
    const mergedOptions = {
        data: { ...defaultOptions.data, ...options.data },
        options: { ...defaultOptions.options, ...options.options }
    };

    // 创建折线图并存储实例
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: mergedOptions.data,
        options: mergedOptions.options
    });
}

// 随机生成颜色的辅助函数
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}