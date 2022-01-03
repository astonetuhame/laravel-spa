<?php

namespace App\Models;

use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['project_id', 'name', 'due_date'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function getPriorityAttribute()
    {
        return ($this->due_date) ? 'High' : 'Low';
    }
}
