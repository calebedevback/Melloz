-- Funções para incrementar/decrementar contador de confirmados

-- Incrementar contador de confirmados
CREATE OR REPLACE FUNCTION increment_confirmed_count(event_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE events 
  SET confirmedCount = confirmedCount + 1 
  WHERE id = event_id;
END;
$$ LANGUAGE plpgsql;

-- Decrementar contador de confirmados
CREATE OR REPLACE FUNCTION decrement_confirmed_count(event_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE events 
  SET confirmedCount = GREATEST(0, confirmedCount - 1) 
  WHERE id = event_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger automático para atualizar contador quando alguém entra/sai
CREATE OR REPLACE FUNCTION update_event_confirmed_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events 
    SET confirmedCount = confirmedCount + 1 
    WHERE id = NEW.eventId;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events 
    SET confirmedCount = GREATEST(0, confirmedCount - 1) 
    WHERE id = OLD.eventId;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Criar triggers
DROP TRIGGER IF EXISTS event_attendees_count_trigger ON event_attendees;
CREATE TRIGGER event_attendees_count_trigger
  AFTER INSERT OR DELETE ON event_attendees
  FOR EACH ROW
  EXECUTE FUNCTION update_event_confirmed_count();
