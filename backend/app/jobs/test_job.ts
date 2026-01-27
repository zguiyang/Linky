import { Job } from 'adonisjs-jobs'

type TestJobPayload = {}

export default class TestJob extends Job {
  async handle(_payload: TestJobPayload) {
    this.logger.info('TestJob job handled')
  }
}
