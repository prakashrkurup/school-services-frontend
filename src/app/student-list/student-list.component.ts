import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { Observable } from "rxjs";
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Observable<Student[]>;

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.students = this.studentService.getStudentList();
    console.log("before====>", this.students);
    this.students.forEach(x=>
    console.log("studentsList====>"+x)
    );
    console.log("after====>");
  }

  deleteStudent(id: number) {
    let confirmAction = confirm("Delete this record?");
        if (confirmAction) {
          this.studentService.deleteStudent(id)
          .subscribe(
            data => {
              console.log(data);
              this.reloadData();
            },
        error => console.log(error));
        }

    
  }

  updateStudent(id: number) {
    this.router.navigate(['update', id]);
  }

  studentDetails(id: number){
    this.router.navigate(['details', id]);
  }

}

// Video