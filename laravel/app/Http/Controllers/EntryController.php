<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Entry;
use App\Category;

class EntryController extends Controller
{

    public function index()
    {
        /*Listando todos esses itens da tabela entries*/
        $entries = DB::table('entries')
                    ->join('categories', 'categories.id', '=' , 'categoryId')
                    ->select('categories.name as catName','entries.*')->get();
        return response()->json($entries);
    }

    public function store(Request $request)
    {
        /*Adicionando todos esses itens da tabela entries*/
		$entry	= new Entry;
		$entry->name = $request->name;
		$entry->description = $request->description;
		$entry->type = $request->type;
		$entry->amount = $request->amount;
		$entry->date = $request->date;
		$entry->paid = $request->paid;
		$entry->categoryId = $request->categoryId;
        $entry->save();
        return  response()->json($entry);
    }

    public function show($id)
    {
        /*Listando um item da tabela entries*/
        $entries = Entry::find($id);
        return response()->json($entries);
    }

    public function update(Request $request, $id)
    {
        /*Atualizando um item da tabela entries*/
        $entry = Entry::where('id','=', $id)->first();
		$entry->name = $request->name;
		$entry->description = $request->description;
		$entry->type = $request->type;
		$entry->amount = $request->amount;
		$entry->date = $request->date;
		$entry->paid = $request->paid;
		$entry->categoryId = $request->categoryId;
        $entry->save();
        return response()->json($entry);
    }

    public function destroy($id)
    {
        /*Deletando um item da tabela entries*/
        $entry = entry::find($id)->delete();
        return response()->json($entry);
    }
}
