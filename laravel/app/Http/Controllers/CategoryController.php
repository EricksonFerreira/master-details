<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Category;

class CategoryController extends Controller
{

    public function index()
    {
        /*Listando todos esses itens da tabela categories*/
        $category = Category::all();
        return  response()->json($category);
    }
    
    public function store(Request $request)
    {
        /*Adicionando todos esses itens da tabela categories*/
		$category	= new Category;
		$category->name = $request->name;
		$category->description = $request->description;
        $category->save();
        return  response()->json($category);
    }
    
    public function show($id)
    {
        /*Listando um item da tabela categories*/
        $category = Category::find($id);
        return response()->json($category);
    }
    
    public function update(Request $request, $id)
    {
        /*Atualizando um item da tabela categories*/
        $category = Category::where('id','=', $id)->first();
        $category->name = $request->name;
		$category->description = $request->description;
        $category->save();    
        return response()->json($category);
    }
    
    public function destroy($id)
    {
        /*Deletando um item da tabela categories*/
        $category = Category::find($id)->delete();
        return response()->json($category);
    }
}
