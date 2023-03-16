import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Locations } from './Locations';
import { Employees } from './Employees';
import { JobHistory } from './JobHistory';

@Index('departments_pkey', ['departmentId'], { unique: true })
@Entity('departments', { schema: 'public' })
export class Departments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'department_id' })
  departmentId: number;

  @Column('character varying', {
    name: 'department_name',
    nullable: true,
    length: 30,
  })
  departmentName: string | null;

  @ManyToOne(() => Locations, (locations) => locations.departments)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'locationId' }])
  location: Locations;

  @ManyToOne(() => Locations, (locations) => locations.departments2)
  @JoinColumn([{ name: 'manager_id', referencedColumnName: 'locationId' }])
  manager: Locations;

  @OneToMany(() => Employees, (employees) => employees.department)
  employees: Employees[];

  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.department)
  jobHistories: JobHistory[];
}
