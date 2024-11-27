export class EmitAppMemberUserEvent {
  constructor(public readonly userId: string) { }

  static updateRedis = Symbol('EmitAppMemberUser:updateRedis')

  static clearAllRedis = Symbol('EmitAppMemberUser:clearAllRedis')
}
