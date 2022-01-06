<template>
    <tr>
        <td class="border px-4 py-2">{{ project.id }}</td>
        <td class="border px-4 py-2">{{ project.name }}</td>
        <td class="border px-4 py-2">
            {{ project.tasks_count }}
        </td>
        <td class="border px-4 py-2">
            <button
                class="bg-gray-500 rounded text-white px-3 py-2 mr-2 hover:bg-gray-700"
            >
                View
            </button>
            <button
                class="bg-red-500 rounded text-white px-3 py-2 mr-2 hover:bg-gray-700"
            >
                Delete
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    props: ["project"],
};
</script>
