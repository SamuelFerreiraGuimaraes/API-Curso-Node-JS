import { IsEmail } from 'class-validator';
import { Note } from 'src/notes/entities/notes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  PassHash: string;

  @OneToMany(() => Note, (note) => note.sender)
  NotesSend: Note[];

  @OneToMany(() => Note, (note) => note.receiver)
  NotesReceive: Note[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
