-- Create rolls table
create table rolls (
    id bigserial primary key,
    name text not null,
    description text,
    recs_count integer default 0,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
);

-- Create recs table
create table recs (
    id bigserial primary key,
    roll_id bigint not null references rolls(id) on delete cascade,
    name text not null,
    url text,
    rating smallint check (rating >= 0 and rating <= 4),
    description text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
);

-- Create trigger function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = current_timestamp;
    return new;
end;
$$ language plpgsql;

-- Create triggers for both tables
create trigger update_rolls_updated_at
    before update on rolls
    for each row
    execute function update_updated_at_column();

create trigger update_recs_updated_at
    before update on recs
    for each row
    execute function update_updated_at_column();
