<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\FileRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\Project as ProjectResource;


class FilesController extends Controller
{
    public function store(FileRequest $request)
    {
        $project = Project::findOrFail($request->project_id);
        $this->authorize('upload', $project);
        $image = $request->file('image');
        $filename = time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('/public', $filename);
        $project->image = $filename;
        $project->save();

        $tasks = $project->tasks;
        return new ProjectResource($project);
    }
}
