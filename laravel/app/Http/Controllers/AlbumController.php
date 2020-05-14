<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use File;
use App\Album;
use App\ImgAlbum;

class AlbumController extends Controller
{
    public function index()
    {
        /*Listando todos esses itens da tabela albuns*/
        $albuns = Album::all();
        return  response()->json($albuns);
    }

    public function store(Request $request)
    {
        return $request;
        $ex = $request->allFiles()['image']->extension();
        /*Adicionando todos esses itens da tabela albuns*/
		$album	= new Album;
		$album->name = $request->nome;
		$album->description = $request->descricao;
        $album->save();

        /*Adicionando todos esses itens da tabela imgAlbuns*/
		$imagem	= new ImgAlbum;
		$imagem->name = 'img_'.bin2hex(random_bytes(2)).'.'.$ex;
		$imagem->album_id = $album->id;
        $imagem->save();

        // Comprimindo imagem
        $source_path = $request->File()['image'];
        $destination_path = "albuns/".$album->id.'/';
        $quality = 6;
        $info = getimagesize($source_path);

        // Verifica qual o tipo de imagem
        if ($info['mime'] == 'image/jpeg') {
            $image = imagecreatefromjpeg($source_path);
        } elseif ($info['mime'] == 'image/jpg') {
            $image = imagecreatefromjpg($source_path);
        } elseif ($info['mime'] == 'image/png') {
            $image = imagecreatefrompng($source_path);
        } elseif ($info['mime'] == 'image/bmp') {
            $image = imagecreatefrombmp($source_path);
        }else{
            return back()->withErrors(['images'=>'Adicione arquivos com formato de imagem']);
        };

        // Verifica se existe esse diretorio
        if(!is_dir($destination_path)){
            mkdir($destination_path);
        }
        // Adiciona ao diretorio
        imagejpeg($image, $destination_path.$imagem->name,20);

        // Resposta
        $resposta[] = [
            'Album' => $album,
            'Imagem' => $imagem
        ];

        return  response()->json($resposta);
    }

    public function show($id)
    {
        /*Listando um item da tabela albuns*/
        $album = Album::find($id);
        return response()->json($album);
    }

    public function update(Request $request, $id)
    {
        /*Adicionando todos esses itens da tabela albuns*/
        if(isset($request->name) or isset($request->description)){
            $album	= Album::where('id',$id)->first();
            $album->name = isset($request->name) ? $request->name : $album->name;
            $album->description = isset($request->description) ? $request->description : $album->description;
            $album->save();
        }

        return $request->file;
        if(isset($request->allFiles()['image'])){
            return $request;

            // extensão da imagem
            $ex = $request->allFiles()['image']->extension();
            /*Consiultando imagens do album*/
            $imagem	= ImgAlbum::where('album_id',$id);

            // Vê se existe imagem antiga no album para exclui-lo
            $diretorio = "albuns/".$album->id.'/';
            $nome_img = $imagem->name;
            if (File::exists($diretorio.$nome_img)) {
                $f = File::delete($diretorio.$nome_img);
            }

            // Atualizando no banco
            $imagem->name = 'img_'.bin2hex(random_bytes(2)).'.'.$ex;
            $imagem->album_id = $album->id;
            $imagem->save();

            // Comprimindo imagem
            $source_path = $request->File()['image'];
            $destination_path = "albuns/".$album->id.'/';
            $quality = 6;
            $info = getimagesize($source_path);

            // Verifica qual o tipo de imagem
            if ($info['mime'] == 'image/jpeg') {
                $image = imagecreatefromjpeg($source_path);
            } elseif ($info['mime'] == 'image/jpg') {
                $image = imagecreatefromjpg($source_path);
            } elseif ($info['mime'] == 'image/png') {
                $image = imagecreatefrompng($source_path);
            } elseif ($info['mime'] == 'image/bmp') {
                $image = imagecreatefrombmp($source_path);
            }else{
                return back()->withErrors(['images'=>'Adicione arquivos com formato de imagem']);
            };

            // Verifica se existe esse diretorio
            if(!is_dir($destination_path)){
                mkdir($destination_path);
            }
            // Adiciona ao diretorio
            imagejpeg($image, $destination_path.$imagem->name,20);
        }
return 'oi';
        // Resposta
        $resposta = "oi";

        return  response()->json($resposta);
    }

    public function destroy($id)
    {

        // Consulta o album
        $query1 = DB::table('albuns')->where('id',$id);
        $album = $query1->get();

        // Consulta a imagem
        $query2 = DB::table('imgAlbuns')->where('album_id',$album[0]->id);
        $imagem = $query2->get();


        // diretorio e nome
        for($i = 0; $i< count($imagem);$i++){

            $diretorio = "albuns/".$album[$i]->id.'/';
            $nome_img = $imagem[$i]->name;

            // Vê se existe imagem no album para exclui-lo
            if (File::exists($diretorio.$nome_img)) {
                $f = File::delete($diretorio.$nome_img);
            }
        }

        // Vê se existe a pasta do album para exclui-lo
        if (File::exists($diretorio)) {
            $f = File::delete($diretorio);
        }
        // Deleta a tabela e redireciona
        $query2->delete();
        $query1->delete();

        return  response()->json('Apagado com sucesso!');
    }}
