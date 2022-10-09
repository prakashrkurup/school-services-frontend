import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { exit } from 'process';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student: Student = new Student();
  submitted = false;

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
  }

  newStudent(): void {
    this.submitted = false;
    this.student = new Student();
  }

  save() {
    this.studentService
    .addStudent(this.student).subscribe(data => {
      console.log("data====>", data)
      this.student = new Student();
      // alert("You submitted successfully!")
      this.gotoList();
    }, 
    error => console.log("Error===>", error));
    this.gotoList();
  }

  onSubmit() {
    if(null==this.student.student_department || this.student.student_department.trim()=='' || null==this.student.student_email || this.student.student_email.trim()=='' || null==this.student.student_name || this.student.student_name.trim()=='') {
      alert("Please enter valid data")
      exit();
    }
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.studentService.getStudentList();
    this.router.navigate(['/students']);
  }

}
