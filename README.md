
# Pet Adoption Website and Database

This is Fido, the best way to adopt a new friend. Fido connects pet enjoyers with animals in need of a fresh home. We offer a wide variety of pets, from birds to koalas. Our platform makes the adoption process simple and straightforward, protection your privacy and data along the way. 



## Authors

- [@Oakuopus](https://github.com/oakuopus)
- [@DanielFreeman068](https://github.com/DanielFreeman068)



## Dev Dependencies

Libraries used include:
autoprefixer,
bcrypt,
cloudinary,
cookie-parser,
dotenv,
ejs,
express,
mongoose,
multer,
multer-storage-cloudinary,
and, postcss.

## Deployment

    1. Download Zip file from github
    2. Extract zip file
    3. Open terminal and run:
```bash
  npm i
  npm run dev
```
    4. Open URL: http://localhost:5500/ 
    5. Login or create account to get started

## Usage

#### Admin 
```bash
  localhost:5000/adminPets
```

#### Login page route code example
```
const getLogin = asyncWrapper(async (req, res) => {
    try {
        // if loggedIn is true, redirect to main page
        if(loggedIn) {
            res.redirect('/')
        }else{
            res.status(200).render('login');
        }
    } catch (error) {
        // In case of an error, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
```
#### Login Schema code example    
```
username:{
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Atleast 3 charachters."],
        maxlength: [20, "No more than 20 characters."],
    },
```
#### Cloudinary Storage code example
```
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
        params: {
            folder: 'full-cloud-tasks',
            allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
            public_id: (req,file) => file.originalname
        },
})
const upload = multer({ storage })
```


## Contributing

Contributions are always welcome!

Email `okuopu637@gmail.com` to learn more

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Version
 - 1.0 
10/16/2024
