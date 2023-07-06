import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins data could not be loaded!');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabins data could not be deleted!');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Check if image on server exist
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image
    : `${newCabin.image.name}-${Math.random()}`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const image = hasImagePath ? imageName : imagePath;

  // 1. Create/edit cabin
  let query = supabase.from('cabins');

  // 1.1 Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: image }]);

  // 1.2 Edit cabin
  if (id) query = query.update({ ...newCabin, image: image }).eq('id', id);

  const { data, error } = await query.select().single();

  // Error create cabin
  if (error) {
    console.log(error);
    throw new Error('Cabins data could not be created!');
  }

  // If server has image > return
  if (hasImagePath) return data;

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete uploaded cabin if error on upload image
  if (storageError) {
    console.log(storageError);
    await deleteCabin(data.id);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}
