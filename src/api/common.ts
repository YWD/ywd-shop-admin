import request from '@/utils/request'
import { ILoginInfo } from '@/api/types/common'

export const getLoginInfo = () => request.get<ILoginInfo>('admin/login/info')
