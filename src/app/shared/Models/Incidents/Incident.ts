import { IncidentPriority } from './Priority';
import { IncidentStatus } from './Status';

export class Incident {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly priority: IncidentPriority,
    readonly status: IncidentStatus,

    readonly reportedBy: string,
    readonly reportedById: string
  ) {}
}
