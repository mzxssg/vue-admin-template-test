import request from '@/utils/request'

export default {
    //获取医院设置列表
    getHospSetList(current,limit,searchObj){
        return request({
            url: `/admin/hosp/hospitalSet/findPage/${current}/${limit}`, 
            method: 'post',
            data: searchObj  //使用json
          })
    },
    //删除某个医院设置
    deleteHospSetById(id){
        return request({
            url:`/admin/hosp/hospitalSet/${id}`,
            method: 'delete'
    })
    },
    //查询医院设置表所有信息
    findAllHospitalSet(){
        return request({
            url:'/admin/hosp/hospitalSet/findAll',
            method: 'get'
        })
    },
    //批量删除
    batchRemoveHospSet(idList){
        return request({
            url: '/admin/hosp/hospitalSet/batchRemove',
            method: 'delete',
            data: idList
        })
    },
    //锁定和取消锁定
    lockHospSet(id,status){
        return request({
            url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
            method: 'put',
        })
    }
}