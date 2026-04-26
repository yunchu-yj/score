import request from '@/utils/request'

//  获取竞赛列表
const listCompetitions = (data) => {
    return request({
        method: "GET",
        url: "list_competitions",
        params: data
    })
}

// 提交竞赛
const submitCompetition = (data) => {
    return request({
        method: "POST",
        url: "save_record",
        data: data
    })
}

//模糊搜索竞赛
const searchByKeyword = (data) => {
    return request({
        method: "GET",
        url: "search_competitions",
        params: data
    })
}

//按类查询竞赛
const searchByCategory = (data) => {
    return request({
        method: "GET",
        url: "list_score_standards",
        params: data
    })
}

// 默认导出所有API函数
export default {
    listCompetitions,
    submitCompetition,
    searchByKeyword,
    searchByCategory
}