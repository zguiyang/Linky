import transmit from '@adonisjs/transmit/services/main'
import type { TransmitEvent } from '#constants/index'

export class TransmitService {
  async toUser(channel: string, event: TransmitEvent, data: any): Promise<void> {
    await transmit.broadcast(channel, { event, data })
  }
}
