# task_management_nine_dots
nine_dots----  
`````````

  Run both server using front and backend simultaneously using  :  
  npm run dev
   --- concurrently ..

port of vite is changed from default 5173  to   http://localhost:3000/ 
and server port is     http://localhost:8000

server port
``````````
const port = process.env.PORT || 8000;

check vite config
````````````````


export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    proxy:{
      '/api':{
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
}) 




just add .env file inside main project folder
            

         

  add this = () =>{  
                   NODE_ENV=development
                   PORT=8000 
                   MONGO_URI= your mongo uri
                   JWT_SECRET = aishuvimu123
                   }

         -- Project done using 
                ``````````````````````
                   -Mongodb 
                   -Express js
                   -Vite-react
                   -tailwind css
                   -toastify for notifying
                   -skeleton for task cards
                   -paginated
                   -only logined users can add task
                   -jwt token generated for authentication with the middleware protect.........
                   -redux tooklit -
                   -Api integrated with ApiSlices ..and made hook and passed to components




