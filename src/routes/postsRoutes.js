import express from "express"
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js"


// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
  
// Cria uma instância do middleware Multer
const upload = multer({ dest: "./uploads", storage });
  
const routes = (app) => {
    app.use(express.json());
    
    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost)
    
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost);

}

export default routes;
