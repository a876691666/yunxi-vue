import type { SysDeptEntity } from '../../dept/entities/dept.entity'
import type { SysPostEntity } from '../../post/entities/post.entity'
import type { SysRoleEntity } from '../../role/entities/role.entity'
import type { UserEntity } from '../entities/sys-user.entity'

export interface UserType {
  browser: string
  ipaddr: string
  loginLocation: string
  loginTime: Date
  os: string
  permissions: string[]
  roles: string[]
  token: string
  user: {
    dept: SysDeptEntity
    roles: Array<SysRoleEntity>
    posts: Array<SysPostEntity>
  } & UserEntity
  userId: number
  username: string
  deptId: number
}
