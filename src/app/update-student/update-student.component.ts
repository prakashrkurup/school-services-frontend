import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { exit } from 'process';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  id: number;
  student: Student;
  imageFile: File;

  constructor(private route: ActivatedRoute,private router: Router,
    private studentService: StudentService) { }

  ngOnInit() {
    this.student = new Student();
    this.imageFile=null;

    this.id = this.route.snapshot.params['id'];
    
    this.studentService.getStudent(this.id)
      .subscribe(data => {
        console.log(data)
        this.student = data;
      }, error => console.log(error));
  }

  public onFileChanged(event) {
    //Select File
    this.imageFile = event.target.files[0];
  }

  updateStudent() {
    // this.student.student_img = this.imageFile;
    this.studentService.updateStudent(this.id, this.student)
      .subscribe(data => {

        // if(this.imageFile != null) {
        //   this.studentService.updateImage(this.id, this.imageFile)
        // }

        // console.log("student=====>", this.student);
        // console.log("data=====>", data);
        // console.log("imageFile=====>", this.imageFile);
        this.student = new Student();
        this.gotoList();
      }, 

      error => console.log(error));
      this.gotoList();
  }

  onSubmit() {
    if(this.student.student_department==null || this.student.student_department.trim()=='' || this.student.student_email==null || this.student.student_email.trim()=='' || this.student.student_name==null || this.student.student_name.trim()=='') {
      alert("Please enter valid data")
      exit();
    }
    this.updateStudent();    
  }

  gotoList() {
    this.router.navigate(['/students']);
  }

}
