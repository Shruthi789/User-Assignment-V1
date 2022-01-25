import {useFormik} from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function FormComponent({initialValues,submitHandler,action}){
    
    const formValidationSchema=yup.object({
        name:yup.string().required('Enter a name!!'),
        DOB:yup.string().matches('[0-9]{2}[/][0-9]{2}[/][0-9]{4}','Enter a valid date').required('Enter a date!'),
        designation:yup.string().max(30,'Limit is 30 characters').required('Enter a designation!'),
        salary:yup.number().min(250000,'Enter a higher salary').max(2000000,'Enter a lower salary').required('Enter a salary!'),
        hobbies:yup.string().min(10,'Enter a minimum of 10 characters').required('Enter hobbies!'),
        userImage:yup.string().min(4,'Enter a minimum of 4 characters').required('Enter a user image!'),
        mainImage:yup.string().min(8,'Enter a minimum of 8 characters').required('Enter a main image!')
      });
      const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
        initialValues: initialValues,
        validationSchema:formValidationSchema,
        onSubmit:submitHandler
      })
    return (<div>
        <h2 className="heading-style">{action} USER</h2>
        <div className='adjust-form'>
        <form onSubmit={handleSubmit} className="add-form-arrangement">
        <div className="form-style">
        <label className="label-style">Name: </label>
        <TextField
      id="name"
      name="name"
      label="Name"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.name && touched.name}
      helperText={touched.name?errors.name:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
        <label className="label-style">Date of Birth: </label>
        <TextField
      id="DOB"
      name="DOB"
      label="Date of Birth"
      value={values.DOB}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.DOB && touched.DOB}
      helperText={touched.DOB?errors.DOB:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
      <label className="label-style">Designation: </label>
        <TextField
        id="designation"
      name="designation"
      label="Designation"
      value={values.designation}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.designation && touched.designation}
      helperText={touched.designation?errors.designation:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
    <label className="label-style">Salary: </label>
        <TextField
        id="salary"
       name="salary"
      label="Salary"
      value={values.salary}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.salary && touched.salary}
      helperText={touched.salary?errors.salary:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
     <label className="label-style">Hobbies: </label>
        <TextField
        id="hobbies"
      name="hobbies"
      label="Hobbies"
      value={values.hobbies}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.hobbies && touched.hobbies}
      helperText={touched.hobbies?errors.hobbies:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
     <label className="label-style"> User Image: </label>
        <TextField
        id="userImage"
      name="userImage"
      label="User Image"
      value={values.userImage}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.userImage && touched.userImage}
      helperText={touched.userImage?errors.userImage:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
    <label className="label-style"> Main Image: </label>
        <TextField
      id="mainImage"
      name="mainImage"
      label="Main Image"
      value={values.mainImage}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.mainImage && touched.mainImage}
      helperText={touched.mainImage?errors.mainImage:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
       <Button variant="contained" type="Submit" sx={{color:'beige'}}>+{action} User</Button>

</form>
</div> 
</div>);
}

export {FormComponent};